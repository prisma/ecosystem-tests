#----------------------------------------------------------
# Copyright (C) Microsoft Corporation. All rights reserved.
#----------------------------------------------------------

# Azure Cosmos DB Emulator management functions

using namespace System.ServiceProcess

Set-Variable ProductName -Option Constant -Value "Azure Cosmos DB Emulator"
Set-Variable DefaultDefaultPartitionCount -Option Constant -Value 25
Set-Variable DefaultCassandraPortNumber -Option Constant 10350
Set-Variable DefaultGremlinPortNumber -Option Constant 8901
Set-Variable DefaultTablePortNumber -Option Constant 8902
Set-Variable DefaultSqlComputePortNumber -Option Constant 8903
Set-Variable DefaultMongoPortNumber -Option Constant 10250
Set-Variable DefaultPortNumber -Option Constant -Value 8081

Set-Variable InstallLocation -Option ReadOnly -Value (
    Get-ItemProperty "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*" |
        Where-Object { $_.DisplayName -eq $ProductName } |
        Select-Object -First 1 -Property InstallLocation
).InstallLocation

if ([string]::IsNullOrEmpty($InstallLocation)) {

    # Optimistically assume a copy-install in lieu of an MSI install with this module placed here: $PSScriptRoot\..\..\PSModules\Microsoft.Azure.CosmosDB.Emulator
    # => $InstallLocation = Resolve-Path "$PSScriptRoot\..\.."

    $realPath = if ($null -eq (Get-Item $PSScriptRoot ).LinkType) {
        $PSScriptRoot
    }
    else {
        (Get-Item $PSScriptRoot).Target
    }

    Set-Variable InstallLocation -Force -Option ReadOnly -Value (Resolve-Path "$realPath\..\..")
}

Set-Variable EmulatorPath -Option ReadOnly -Value (Join-Path $InstallLocation "CosmosDB.Emulator.exe")

<#
 .Synopsis
  Gets the self-signed certificate used by the Cosmos DB Emulator.

 .Description
  The Get-CosmosDbEmulatorCertificate cmdlet returns the self-signed SSL certficate used by the Cosmos DB Emulator. This
  certificate is the first certificate from Cert:\LocalMachine\My matching these criteria:

  FriendlyName: DocumentDbEmulatorCertificate
  Subject: CN=localhost
  Issuer: CN=localhost

  .Example
  # $certificate | Export-Certificate -Type CERT -FilePath azure-cosmosdb-emulator.cer
  Gets the Emulator's self-signed certificate and exports it as .cer file.

#>
function Get-CosmosDbEmulatorCertificate {
    [CmdletBinding()]
    param()

    if (-not (Test-Installation)) {
        return
    }
    $certificate = Get-ChildItem Cert:\LocalMachine\My | Where-Object { $_.FriendlyName -eq "DocumentDbEmulatorCertificate" -and $_.Subject -eq "CN=localhost" -and $_.Issuer -eq "CN=localhost" }
    if ($null -eq $certificate) {
        Write-Error "Cannot find DocumentDbEmulatorCertificate in Cert:\LocalMachine\My"
    }
    $certificate
}

<#
 .Synopsis
  Gets the status of the Cosmos DB Emulator.

 .Description
  The Get-CosmosDbEmulatorStatus cmdlet returns one of these ServiceControllerStatus values: ServiceControllerStatus.StartPending, 
  ServiceControllerStatus.Running, or ServiceControllerStatus.Stopped; otherwise--if an error is encountered--no value is returned.
#>
function Get-CosmosDbEmulatorStatus {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [string]
        $AlternativeInstallLocation = $null
    )

    if (-not (Test-Installation)) {
        return
    }

    $Emulator = $EmulatorPath

    if (-not [string]::IsNullOrWhitespace($AlternativeInstallLocation)) {
        $Emulator = $AlternativeInstallLocation
    }

    if (!(Test-Path $Emulator)) {
        Write-Error "The emulator is not installed where expected at '$Emulator'"
        return
    }

    $process = Start-Process $Emulator -ArgumentList "/getstatus" -PassThru -Wait

    switch ($process.ExitCode) {
        1 {
            [ServiceControllerStatus]::StartPending
        }
        2 {
            [ServiceControllerStatus]::Running
        }
        3 {
            [ServiceControllerStatus]::Stopped
        }
        default {
            Write-ErrorUnrecognizedExitCode $process.ExitCode
        }
    }
}

<#
 .Synopsis
  Generates and installs a new self-signed SSL Certificate for the Cosmos DB Emulator

 .Description
 The New-CosmosDbEmulatorCertificate cmdlet generates a new self-signed SSL certificate for the Emulator. The certificate is 
 installed to Cert:\LocalMachine\My and replaces the current SSL certificate used by the Emulator. The certificate is also 
 added to Cert:\LocalMachine\Trust.
 
 The generated certificate has these properties.

    Friendly name: DocumentDbEmulatorCertificate
    Subject: localhost
    Issuer: localhost
  
    Subject Alternative Name:

    * Hostname as returned by [System.Net.Dns]::GetHostEntry((hostname)).HostName.
    * The names provided by the DnsName argument to this function.
    * The IPv4 addresses as returned by:
        [System.Net.Dns]::GetHostEntry((hostname)).AddressList | 
        Where-Object { $_.AddressFamily -eq "InterNetwork" } | 
        ForEach-Object { $_.IpAddressToString }
    * "localhost"
    * "127.0.0.1"

 For compatibility with Windows Server 2012, all IPv4 Addresses are added to the Subject Alternative Name list as both
 DNS names and IP addresses.

 .Example
 # New-CosmosDbEmulatorCertificate cosmosdb-emulator, cosmosdb-emulator.constoso.com
 Generates and installs a self-signed SSL certificate that replaces the one currently used by the Emulator. The new
 certificate includes two additional domain names in the certificates subject alternative name list:

 * cosmosdb-emulator and
 * cosmosdb-emulator.contoso.com

#>
function New-CosmosDbEmulatorCertificate {
    param(
        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [string]
        $AlternativeInstallLocation = $null,

        [Parameter(Position = 1, Mandatory = $false)]
        [string[]]
        $DnsName
    )

    $Emulator = $EmulatorPath

    if (-not [string]::IsNullOrWhitespace($AlternativeInstallLocation)) {
        $Emulator = $AlternativeInstallLocation
    }

    if (!(Test-Path $Emulator)) {
        Write-Error "The emulator is not installed where expected at '$Emulator'"
        return
    }

    Start-Process $Emulator -ArgumentList "/noui /gencert=`"$(if ($DnsName.Count -gt 0) { $DnsName -join ',' })`"" -Wait

    if ($LASTEXITCODE -eq 0) {
        Get-CosmosDbEmulatorCertificate
    }
    else {
        Write-Error "Certificate generation failed with exit code $LASTEXITCODE"
    }
}

<#
 .Synopsis
  Removes all the files used by the Cosmos DB Emulator for a given data path

 .Description
 The Remove-CosmosDbEmulatorData cmdlet recursively removes all the content used by the Cosmos DB Emulator from the given
 data path or the $env:LocalAppData\CosmosDbEmulator if the data path is not specified.
 
 .Example
 # Remove-CosmosDbEmulatorData
 It recursively removes all the files in $env:LocalAppData\CosmosDbEmulator directory.
 # Remove-CosmosDbEmulatorData C:\MyDataPath
 It recursively removes all the files in C:\MyDataPath\CosmosDBEmulator directory.

#>
function Remove-CosmosDbEmulatorData {
    param(
        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [string]
        $AlternativeInstallLocation = $null,

        [Parameter(Position = 1, Mandatory = $false)]
        [string]
        $Path
    )

    $Emulator = $EmulatorPath

    if (-not [string]::IsNullOrWhitespace($AlternativeInstallLocation)) {
        $Emulator = $AlternativeInstallLocation
    }

    if (!(Test-Path $Emulator)) {
        Write-Error "The emulator is not installed where expected at '$Emulator'"
        return
    }

    Start-Process $Emulator -ArgumentList "/noui /resetdatapath$(if ($Path) { '=' + $Path })" -Wait

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Emulator data path removal failed with exit code $LASTEXITCODE"
    }
}

<#
 .Synopsis
  Starts the Cosmos DB Emulator on the local computer.

 .Description
  The Start-CosmosDbEmulator cmdlet starts the Cosmos DB Emulator on the local computer. You can use the parameters of
  Start-CosmosDbEmulator to specify options, such as the port, direct port, and mongo port numbers.

 .Parameter AllowNetworkAccess
  Allow access from all IP Addresses assigned to the Emulator's host. You must also specify a value for Key or KeyFile 
  to allow network access.

 .Parameter AlternativeInstallLocation
  Alternative location path to the Cosmos DB emulator executable.

 .Parameter CassandraPort
  Port number to use for the Cassandra Compatibility API. The default port number is 10350.

 .Parameter ComputePort
  Port to use for the Compute Interop Gateway service. The Gateway's HTTP endpoint probe port is calculated as 
  ComputePort + 79. Hence, ComputePort and ComputePort + 79 must be open and available. The defaults is 8900, 8979.

 .Parameter Consistency
  Sets the default consistency level for the Emulator to Session, Strong, Eventual, or BoundedStaleness. The default
  is Session.

 .Parameter Credential
  Specifies a user account that has permission to perform this action. Type a user name, such as User01 or
  Domain01\User01, or enter a PSCredential object, such as one from the Get-Credential cmdlet. By default,
  the cmdlet uses the credentials of the current user.

 .Parameter DataPath
  Path to store data files. The default location for data files is $env:LocalAppData\CosmosDbEmulator.

 .Parameter DefaultPartitionCount
  The number of partitions to reserve per partitioned collection. The default is 25, which is the same as default value of
  the total partition count.

 .Parameter DirectPort
  A list of 4 ports to use for direct connectivity to the Emulator's backend. The default list is 10251, 10252, 10253, 10254.

 .Parameter EnableMongoDb
  Specifies that MongoDB API endpoint is enabled (default is false).

 .Parameter EnableCassandra
  Specifies that Cassandra API endpoint is enabled (default is false).

 .Parameter EnableGremlin
  Specifies that Gremlin (Graph) API endpoint is enabled (default is false).

 .Parameter EnableTable
  Specifies that Table API endpoint is enabled (default is false).

 .Parameter EnableSqlCompute
  Specifies that Sql on Compute API endpoint is enabled (default is false).

 .Parameter EnablePreview
 It enables Cosmos public emulator features that are in preview and not fully matured to be on by default.

 .Parameter FailOnSslCertificateNameMismatch
  By default the Emulator regenerates its self-signed SSL certificate, if the certificate's SAN does not include the Emulator
  host's domain name, local IPv4 address, 'localhost', and '127.0.0.1'. With this option, the Emulator will fail at startup
  instead. You should then use the New-CosmosDbEmulatorCertificate option to create and install a new self-signed SSL 
  certificate.

 .Parameter GremlinPort
  Port number to use for the Gremlin Compatibility API. The default port number is 8901.

 .Parameter TablePort
  Port number to use for the Table Compatibility API. The default port number is 8902.

 .Parameter SqlComputePort
  Port number to use for the Sql on Compute Compatibility API. The default port number is 8903.

 .Parameter Key
  Authorization key for the Emulator. This value must be the base 64 encoding of a 64 byte vector.

 .Parameter MongoPort
  Port number to use for the Mongo Compatibility API. The default port number is 10250.

 .Parameter NoFirewall
  Specifies that no inbound port rules should be added to the Emulator host's firewall.

 .Parameter NoTelemetry
  Specifies that the cmdlet should not collect telemetry data for the current Emulator session.

 .Parameter NoUI
  Specifies that the cmdlet should not present the Windows taskbar icon user interface.

 .Parameter NoWait
  Specifies that the cmdlet should return as soon as the emulator begins to start. By default the cmdlet waits until startup
  is complete and the Emulator is ready to receive requests.

 .Parameter PartitionCount
  The total number of partitions allocated by the Emulator.

 .Parameter Port
  Port number for the Emulator Gateway Service and Web UI. The default port number is 8081.

 .Parameter Trace
  Indicates whether the Emulator should be configured for traces prior to startup

 .Example
  # Start-CosmosDbEmulator
  Start the Emulator and wait until it is fully started and ready to accept requests.

 .Example
  # Start-CosmosDbEmulator -DefaultPartitionCount 5
  Start the Emulator with 5 partitions reserved for each partitioned collection. The total number of partitions is set
  to the default: 25. Hence, the total number of partitioned collections that can be created is 5 = 25 partitions / 5
  partitions/collection. Each partitioned collection will be capped at 50 GB = 5 partitions * 10 GB / partiton.

 .Example
  # Start-CosmosDbEmulator -Port 443 -MongoPort 27017 -DirectPort 20001,20002,20003,20004
  Starts the Emulator with altermative port numbers.
#>
function Start-CosmosDbEmulator {
    [CmdletBinding(PositionalBinding = $false)]
    param(
        [Parameter(Mandatory = $false)]
        [switch]
        $AllowNetworkAccess,

        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [string]
        $AlternativeInstallLocation = $null,

        [Parameter(Mandatory = $false)]
        [UInt16]
        $CassandraPort = $DefaultCassandraPortNumber,

        [Parameter(Mandatory = $false)]
        [UInt16]
        $ComputePort = $null,

        [Parameter(Mandatory = $false)]
        [ValidateSet('BoundedStaleness', 'Eventual', 'Session', 'Strong')]
        [string]
        $Consistency,

        [Parameter(Mandatory = $false)]
        [ValidateNotNull()]
        [PSCredential]
        $Credential = $null,

        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [string]
        $DataPath = $null,

        [Parameter(Mandatory = $false)]
        [ValidateRange(1, 250)]
        [UInt16]
        $DefaultPartitionCount = $DefaultDefaultPartitionCount,

        [Parameter(Mandatory = $false)]
        [ValidateCount(4, 4)]
        [UInt16[]]
        $DirectPort = $null,

        [Parameter(Mandatory = $false)]
	    [ValidateNotNullOrEmpty()]
        [string]
        $EnableMongoDb,

        [Parameter(Mandatory = $false)]
        [switch]
        $EnableCassandra,

        [Parameter(Mandatory = $false)]
        [switch]
        $EnableGremlin,

        [Parameter(Mandatory = $false)]
        [switch]
        $EnableTable,

        [Parameter(Mandatory = $false)]
        [switch]
        $EnableSqlCompute,

        [Parameter(Mandatory = $false)]
        [switch]
        $EnablePreview,

        [Parameter(Mandatory = $false)]
        [switch]
        $FailOnSslCertificateNameMismatch,

        [Parameter(Mandatory = $false)]
        [UInt16]
        $GremlinPort = $DefaultGremlinPortNumber,

        [Parameter(Mandatory = $false)]
        [UInt16]
        $TablePort = $DefaultTablePortNumber,

        [Parameter(Mandatory = $false)]
        [UInt16]
        $SqlComputePort = $DefaultSqlComputePortNumber,

        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [string]
        $Key = $null,

        [Parameter(Mandatory = $false)]
        [UInt16]
        $MongoPort = $DefaultMongoPortNumber,

        [Parameter(Mandatory = $false)]
        [switch]
        $NoFirewall,

        [Parameter(Mandatory = $false)]
        [switch]
        $NoTelemetry,

        [Parameter(Mandatory = $false)]
        [switch]
        $NoUI,

        [Parameter(Mandatory = $false)]
        [switch]
        $NoWait,

        [Parameter(Mandatory = $false)]
        [ValidateRange(1, 250)]
        [UInt16]
        $PartitionCount = $DefaultPartitionCount,

        [Parameter(Mandatory = $false)]
        [UInt16]
        $Port = $DefaultPortNumber,

        [Parameter(Mandatory = $false)]
        [switch]
        $SimulateRateLimiting,

        [Parameter(Mandatory = $false)]
        [Uint32]
        $Timeout = 240,

        [Parameter(Mandatory = $false)]
        [switch]
        $Trace
    )

    $Emulator = $EmulatorPath

    if (-not [string]::IsNullOrWhitespace($AlternativeInstallLocation)) {
        $Emulator = $AlternativeInstallLocation
    }

    if (!(Test-Path $Emulator)) {
        Write-Error "The emulator is not installed where expected at '$Emulator'"
        return
    }

    if ($Trace) {
        $process = Start-Process $Emulator -ArgumentList "/starttraces" -PassThru -Wait
        if ($process.ExitCode -ne 0) {
            Write-Error "Attempt to start traces failed with HRESULT 0x$($process.ExitCode.ToString('X8'))"
            return
        }
    }

    $process = Start-Process $Emulator -ArgumentList "/getstatus" -PassThru -Wait

    switch ($process.ExitCode) {
        1 {
            Write-Debug "The emulator is already starting"
            return
        }
        2 {
            Write-Debug "The emulator is already running"
            return
        }
        3 {
            Write-Debug "The emulator is stopped"
        }
        default {
            Write-ErrorUnrecognizedExitCode $process.ExitCode
            return
        }
    }

    $argumentList = , "/noexplorer"

    if ($AllowNetworkAccess) {
        $argumentList += "/allownetworkaccess"
    }

    if (-not [string]::IsNullOrEmpty($ComputePort)) {
        $argumentList += "/computeport=$ComputePort"
    }

    if (-not [string]::IsNullOrEmpty($Consistency)) {
        $argumentList += "/consistency=$Consistency"
    }

    if (-not [string]::IsNullOrWhitespace($DataPath)) {
        $argumentList += "/datapath=`"$DataPath`""
    }

    if ($DefaultPartitionCount -ne $DefaultDefaultPartitionCount) {
        $argumentList += "/defaultpartitioncount=$DefaultPartitionCount"
    }

    if ($null -ne $DirectPort) {
        $argumentList += "/directports=$($DirectPort -Join ',')"
    }

    if (-not [string]::IsNullOrWhitespace($EnableMongoDb)) {
        $argumentList += "/EnableMongoDbEndpoint=`"$EnableMongoDb`""
    }

    if ($EnableCassandra) {
        $argumentList += , "/enablecassandraendpoint"
    }

    if ($EnableGremlin) {
        $argumentList += , "/enablegremlinendpoint"
    }

    if ($EnableTable) {
        $argumentList += , "/enabletableendpoint"
    }

    if ($EnableSqlCompute) {
        $argumentList += , "/enablesqlcomputeendpoint"
    }

    if ($EnablePreview) {
        $argumentList += , "/enablepreview"
    }

    if ($FailOnSslCertificateNameMismatch) {
        $argumentList += "/failoncertificatenamemismatch"
    }
    
    if ($CassandraPort -ne $DefaultCassandraPortNumber) {
        $argumentList += "/cassandraport=$CassandraPort"
    }

    if ($GremlinPort -ne $DefaultGremlinPortNumber) {
        $argumentList += "/gremlinport=$GremlinPort"
    }

    if ($TablePort -ne $DefaultTablePortNumber) {
        $argumentList += "/tableport=$TablePort"
    }

    if ($SqlComputePort -ne $DefaultSqlComputePortNumber) {
        $argumentList += "/sqlcomputeport=$SqlComputePort"
    }

    if (-not [string]::IsNullOrWhiteSpace($Key)) {
        $argumentList += "/key=$Key"
    }

    if ($MongoPort -ne $DefaultMongoPortNumber) {
        $argumentList += "/mongoport=$MongoPort"
    }

    if ($NoFirewall) {
        $argumentList += , "/nofirewall"
    }

    if ($NoTelemetry) {
        $argumentList += , "/notelemetry"
    }

    if ($NoUI) {
        $argumentList += , "/noui"
    }

    if ($PartitionCount -ne $DefaultDefaultPartitionCount) {
        $argumentList += "/partitioncount=$PartitionCount"
    }

    if ($Port -ne $DefaultPortNumber) {
        $argumentList += "/port=$Port"
    }

    $argumentList += if ($SimulateRateLimiting) {
        "/enableratelimiting"
    }
    else {
        "/disableratelimiting"
    }

    Write-Debug "Starting emulator process: $Emulator $argumentList"
    Write-Debug "Credential = $(if ($credential -ne $null) { $credential.UserName } else { "`$null" })"

    $process = if ($Credential -eq $null -or $Credential -eq [PSCredential]::Empty) {
        Start-Process $Emulator -ArgumentList $argumentList -ErrorAction Stop -PassThru
    }
    else {
        Start-Process $Emulator -ArgumentList $argumentList -Credential $Credential -ErrorAction Stop -PassThru
    }

    Write-Debug "Emulator process started: $($process.Name), $($process.FileVersion)"

    if ($NoWait) {
        return;
    }

    [void](Wait-CosmosDbEmulator -AlternativeInstallLocation $Emulator -Status Running -Timeout $Timeout)
}

<#
.Synopsis
Stops the Cosmos DB Emulator on the local computer.

.Description
The Stop-CosmosDbEmulator cmdlet stops the Cosmos DB Emulator on the local computer. By default the cmdlet waits for the
Emulator to fully stop. Use the NoWait switch to proceed as soon as shutdown begins.

.Parameter NoWait
Specifies that the StopCosmosDbEmulator cmdlet proceed as soon as shutdown begins.

#>
function Stop-CosmosDbEmulator {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [string]
        $AlternativeInstallLocation = $null,

        [Parameter(Mandatory = $false)]
        [switch]
        $NoWait,

        [Parameter(Mandatory = $false)]
        [UInt32]
        $Timeout = 240,

        [Parameter(Mandatory = $false)]
        [switch]
        $Trace
    )

    $Emulator = $EmulatorPath

    if (-not [string]::IsNullOrWhitespace($AlternativeInstallLocation)) {
        $Emulator = $AlternativeInstallLocation
    }

    if (!(Test-Path $Emulator)) {
        Write-Error "The emulator is not installed where expected at '$Emulator'"
        return
    }

    if ($Trace) {
        $process = Start-Process $Emulator -ArgumentList "/stoptraces" -PassThru -Wait
    }

    $process = Start-Process $Emulator -ArgumentList "/getstatus" -PassThru -Wait

    switch ($process.ExitCode) {
        1 {
            Write-Debug "The emulator is starting"
        }
        2 {
            Write-Debug "The emulator is running"
        }
        3 {
            Write-Debug "The emulator is already stopped"
            return
        }
        default {
            Write-ErrorUnrecognizedExitCode $process.ExitCode
            return
        }
    }

    & $Emulator /shutdown

    if ($NoWait) {
        return
    }

    [void](Wait-CosmosDbEmulator -AlternativeInstallLocation $Emulator -Status Stopped -Timeout $Timeout)
}

<#
.Synopsis
Uninstalls the Cosmos DB Emulator on the local computer.

.Description
The Uninstall-CosmosDbEmulator cmdlet removes the Cosmos DB Emulator on the local computer. By default the cmdlet keeps
all configuration and databases intact. Use the RemoveData switch to delete all data after removing the the Emulator.

.Parameter RemoveData
Specifies that the Uninstall-CosmosDbEmulator cmdlet should delete all data after it removes the Emulator.

#>
function Uninstall-CosmosDbEmulator {
    [CmdletBinding()]
    param(
        [switch]
        $RemoveData
    )

    $installationIds = Get-ItemProperty "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*" |
        Where-Object { $_.DisplayName -eq $ProductName } |
        ForEach-Object { $_.PSChildName }

    if ($null -eq $installationIds) {
        Write-Warning "The Cosmos DB Emulator is not installed on $env:COMPUTERNAME"
    }
    else {

        foreach ($installationId in $installationIds) {

            & $EmulatorPath "/shutdown"

            Write-Information "Awaiting shutdown"

            for ($timeout = 30; $timeout -gt 0; $timeout--) {
                Write-Debug $timeout
                $process = Start-Process $EmulatorPath -ArgumentList "/getstatus" -PassThru -Wait
                if ($process.ExitCode -eq 3) {
                    break;
                }
                Start-Sleep -Seconds 1
            }

            Write-Information "Uninstalling the emulator"
            Start-Process MsiExec -ArgumentList "/quiet", "/x${installationId}" -Wait
        }
    }

    if ($RemoveData) {
        $dataPath = Join-Path $env:LOCALAPPDATA CosmosDbEmulator
        Write-Information "Removing data from $dataPath"
        Get-Item -ErrorAction SilentlyContinue $dataPath | Remove-Item -Force -Recurse -ErrorAction Stop
    }
}

<#
 .Synopsis
  Waits for the status of the Cosmos DB Emulator to reach a specified status.

 .Description
  The Wait-CosmosDbEmulatorStatus cmdlet waits for the Emulator to reach one of these statuses: [ServiceControllerStatus]::StartPending,
  [ServiceControllerStatus]::Running, or [ServiceControllerStatus]::Stopped. A timeout value in seconds may be set.

 .Parameter Status
  The status to wait for: ServiceControllerStatus]::StartPending, [ServiceControllerStatus]::Running, [ServiceControllerStatus]::Stopped.

 .Parameter Timeout
  A timeout interval in seconds. The default value of zero specifies an unlimited timeout interval.

#>
function Wait-CosmosDbEmulator {
    [CmdletBinding(PositionalBinding = $false)]
    param(
        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [string]
        $AlternativeInstallLocation = $null,

        [ValidateSet([ServiceControllerStatus]::StartPending, [ServiceControllerStatus]::Running, [ServiceControllerStatus]::Stopped)]
        [Parameter(Position = 2, Mandatory = $true)]
        [ServiceControllerStatus]
        $Status,

        [Parameter()]
        [UInt32]
        $Timeout = 0
    )

    $Emulator = $EmulatorPath

    if (-not [string]::IsNullOrWhitespace($AlternativeInstallLocation)) {
        $Emulator = $AlternativeInstallLocation
    }

    if (!(Test-Path $Emulator)) {
        Write-Error "The emulator is not installed where expected at '$Emulator'"
        return
    }

    $complete = if ($Timeout -gt 0) {
        $start = [DateTimeOffset]::Now
        $stop = $start.AddSeconds($Timeout)
        {
            $result -eq $Status -or [DateTimeOffset]::Now -ge $stop
        }
    }
    else {
        {
            $result -eq $Status
        }
    }

    do {
        $process = Start-Process $Emulator -ArgumentList "/getstatus" -PassThru -Wait

        switch ($process.ExitCode) {
            1 {
                Write-Debug "The emulator is starting"
                if ($status -eq [ServiceControllerStatus]::StartPending) {
                    return $true
                }
            }
            2 {
                Write-Debug "The emulator is running"
                if ($status -eq [ServiceControllerStatus]::Running) {
                    return $true
                }
            }
            3 {
                Write-Debug "The emulator is stopped"
                if ($status -eq [ServiceControllerStatus]::Stopped) {
                    return $true
                }
            }
            default {
                Write-ErrorUnrecognizedExitCode $process.ExitCode
                return $false
            }
        }
        Start-Sleep -Seconds 1
    }
    until ($complete.Invoke())

    Write-Error "The emulator failed to reach ${Status} status within ${Timeout} seconds"
    $false
}

function Test-Installation {
    [CmdletBinding()]
    param()

    if (Test-Path $EmulatorPath) {
        $true
    }
    else {
        Write-Error "The emulator is not installed where expected at '$EmulatorPath'"
        $false
    }
}

function Write-ErrorUnrecognizedExitCode {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [int]
        $ExitCode
    )
    Write-Error "The GetStatus operation returned an unrecognized status code: 0x${$ExitCode.ToString("X")}"
}

Export-ModuleMember Get-CosmosDbEmulatorCertificate, Get-CosmosDbEmulatorStatus, New-CosmosDbEmulatorCertificate, Remove-CosmosDbEmulatorData, Start-CosmosDbEmulator, Stop-CosmosDbEmulator, Uninstall-CosmosDbEmulator, Wait-CosmosDbEmulator

# SIG # Begin signature block
# MIInugYJKoZIhvcNAQcCoIInqzCCJ6cCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCDDQUPtsILPGfoF
# 7BfR/pSJm4HPMcJNloWRCBrfuvNJfqCCDYEwggX/MIID56ADAgECAhMzAAACUosz
# qviV8znbAAAAAAJSMA0GCSqGSIb3DQEBCwUAMH4xCzAJBgNVBAYTAlVTMRMwEQYD
# VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25p
# bmcgUENBIDIwMTEwHhcNMjEwOTAyMTgzMjU5WhcNMjIwOTAxMTgzMjU5WjB0MQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMR4wHAYDVQQDExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
# AQDQ5M+Ps/X7BNuv5B/0I6uoDwj0NJOo1KrVQqO7ggRXccklyTrWL4xMShjIou2I
# sbYnF67wXzVAq5Om4oe+LfzSDOzjcb6ms00gBo0OQaqwQ1BijyJ7NvDf80I1fW9O
# L76Kt0Wpc2zrGhzcHdb7upPrvxvSNNUvxK3sgw7YTt31410vpEp8yfBEl/hd8ZzA
# v47DCgJ5j1zm295s1RVZHNp6MoiQFVOECm4AwK2l28i+YER1JO4IplTH44uvzX9o
# RnJHaMvWzZEpozPy4jNO2DDqbcNs4zh7AWMhE1PWFVA+CHI/En5nASvCvLmuR/t8
# q4bc8XR8QIZJQSp+2U6m2ldNAgMBAAGjggF+MIIBejAfBgNVHSUEGDAWBgorBgEE
# AYI3TAgBBggrBgEFBQcDAzAdBgNVHQ4EFgQUNZJaEUGL2Guwt7ZOAu4efEYXedEw
# UAYDVR0RBEkwR6RFMEMxKTAnBgNVBAsTIE1pY3Jvc29mdCBPcGVyYXRpb25zIFB1
# ZXJ0byBSaWNvMRYwFAYDVQQFEw0yMzAwMTIrNDY3NTk3MB8GA1UdIwQYMBaAFEhu
# ZOVQBdOCqhc3NyK1bajKdQKVMFQGA1UdHwRNMEswSaBHoEWGQ2h0dHA6Ly93d3cu
# bWljcm9zb2Z0LmNvbS9wa2lvcHMvY3JsL01pY0NvZFNpZ1BDQTIwMTFfMjAxMS0w
# Ny0wOC5jcmwwYQYIKwYBBQUHAQEEVTBTMFEGCCsGAQUFBzAChkVodHRwOi8vd3d3
# Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01pY0NvZFNpZ1BDQTIwMTFfMjAx
# MS0wNy0wOC5jcnQwDAYDVR0TAQH/BAIwADANBgkqhkiG9w0BAQsFAAOCAgEAFkk3
# uSxkTEBh1NtAl7BivIEsAWdgX1qZ+EdZMYbQKasY6IhSLXRMxF1B3OKdR9K/kccp
# kvNcGl8D7YyYS4mhCUMBR+VLrg3f8PUj38A9V5aiY2/Jok7WZFOAmjPRNNGnyeg7
# l0lTiThFqE+2aOs6+heegqAdelGgNJKRHLWRuhGKuLIw5lkgx9Ky+QvZrn/Ddi8u
# TIgWKp+MGG8xY6PBvvjgt9jQShlnPrZ3UY8Bvwy6rynhXBaV0V0TTL0gEx7eh/K1
# o8Miaru6s/7FyqOLeUS4vTHh9TgBL5DtxCYurXbSBVtL1Fj44+Od/6cmC9mmvrti
# yG709Y3Rd3YdJj2f3GJq7Y7KdWq0QYhatKhBeg4fxjhg0yut2g6aM1mxjNPrE48z
# 6HWCNGu9gMK5ZudldRw4a45Z06Aoktof0CqOyTErvq0YjoE4Xpa0+87T/PVUXNqf
# 7Y+qSU7+9LtLQuMYR4w3cSPjuNusvLf9gBnch5RqM7kaDtYWDgLyB42EfsxeMqwK
# WwA+TVi0HrWRqfSx2olbE56hJcEkMjOSKz3sRuupFCX3UroyYf52L+2iVTrda8XW
# esPG62Mnn3T8AuLfzeJFuAbfOSERx7IFZO92UPoXE1uEjL5skl1yTZB3MubgOA4F
# 8KoRNhviFAEST+nG8c8uIsbZeb08SeYQMqjVEmkwggd6MIIFYqADAgECAgphDpDS
# AAAAAAADMA0GCSqGSIb3DQEBCwUAMIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMK
# V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
# IENvcnBvcmF0aW9uMTIwMAYDVQQDEylNaWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0
# ZSBBdXRob3JpdHkgMjAxMTAeFw0xMTA3MDgyMDU5MDlaFw0yNjA3MDgyMTA5MDla
# MH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
# ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMT
# H01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENBIDIwMTEwggIiMA0GCSqGSIb3DQEB
# AQUAA4ICDwAwggIKAoICAQCr8PpyEBwurdhuqoIQTTS68rZYIZ9CGypr6VpQqrgG
# OBoESbp/wwwe3TdrxhLYC/A4wpkGsMg51QEUMULTiQ15ZId+lGAkbK+eSZzpaF7S
# 35tTsgosw6/ZqSuuegmv15ZZymAaBelmdugyUiYSL+erCFDPs0S3XdjELgN1q2jz
# y23zOlyhFvRGuuA4ZKxuZDV4pqBjDy3TQJP4494HDdVceaVJKecNvqATd76UPe/7
# 4ytaEB9NViiienLgEjq3SV7Y7e1DkYPZe7J7hhvZPrGMXeiJT4Qa8qEvWeSQOy2u
# M1jFtz7+MtOzAz2xsq+SOH7SnYAs9U5WkSE1JcM5bmR/U7qcD60ZI4TL9LoDho33
# X/DQUr+MlIe8wCF0JV8YKLbMJyg4JZg5SjbPfLGSrhwjp6lm7GEfauEoSZ1fiOIl
# XdMhSz5SxLVXPyQD8NF6Wy/VI+NwXQ9RRnez+ADhvKwCgl/bwBWzvRvUVUvnOaEP
# 6SNJvBi4RHxF5MHDcnrgcuck379GmcXvwhxX24ON7E1JMKerjt/sW5+v/N2wZuLB
# l4F77dbtS+dJKacTKKanfWeA5opieF+yL4TXV5xcv3coKPHtbcMojyyPQDdPweGF
# RInECUzF1KVDL3SV9274eCBYLBNdYJWaPk8zhNqwiBfenk70lrC8RqBsmNLg1oiM
# CwIDAQABo4IB7TCCAekwEAYJKwYBBAGCNxUBBAMCAQAwHQYDVR0OBBYEFEhuZOVQ
# BdOCqhc3NyK1bajKdQKVMBkGCSsGAQQBgjcUAgQMHgoAUwB1AGIAQwBBMAsGA1Ud
# DwQEAwIBhjAPBgNVHRMBAf8EBTADAQH/MB8GA1UdIwQYMBaAFHItOgIxkEO5FAVO
# 4eqnxzHRI4k0MFoGA1UdHwRTMFEwT6BNoEuGSWh0dHA6Ly9jcmwubWljcm9zb2Z0
# LmNvbS9wa2kvY3JsL3Byb2R1Y3RzL01pY1Jvb0NlckF1dDIwMTFfMjAxMV8wM18y
# Mi5jcmwwXgYIKwYBBQUHAQEEUjBQME4GCCsGAQUFBzAChkJodHRwOi8vd3d3Lm1p
# Y3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jvb0NlckF1dDIwMTFfMjAxMV8wM18y
# Mi5jcnQwgZ8GA1UdIASBlzCBlDCBkQYJKwYBBAGCNy4DMIGDMD8GCCsGAQUFBwIB
# FjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2RvY3MvcHJpbWFyeWNw
# cy5odG0wQAYIKwYBBQUHAgIwNB4yIB0ATABlAGcAYQBsAF8AcABvAGwAaQBjAHkA
# XwBzAHQAYQB0AGUAbQBlAG4AdAAuIB0wDQYJKoZIhvcNAQELBQADggIBAGfyhqWY
# 4FR5Gi7T2HRnIpsLlhHhY5KZQpZ90nkMkMFlXy4sPvjDctFtg/6+P+gKyju/R6mj
# 82nbY78iNaWXXWWEkH2LRlBV2AySfNIaSxzzPEKLUtCw/WvjPgcuKZvmPRul1LUd
# d5Q54ulkyUQ9eHoj8xN9ppB0g430yyYCRirCihC7pKkFDJvtaPpoLpWgKj8qa1hJ
# Yx8JaW5amJbkg/TAj/NGK978O9C9Ne9uJa7lryft0N3zDq+ZKJeYTQ49C/IIidYf
# wzIY4vDFLc5bnrRJOQrGCsLGra7lstnbFYhRRVg4MnEnGn+x9Cf43iw6IGmYslmJ
# aG5vp7d0w0AFBqYBKig+gj8TTWYLwLNN9eGPfxxvFX1Fp3blQCplo8NdUmKGwx1j
# NpeG39rz+PIWoZon4c2ll9DuXWNB41sHnIc+BncG0QaxdR8UvmFhtfDcxhsEvt9B
# xw4o7t5lL+yX9qFcltgA1qFGvVnzl6UJS0gQmYAf0AApxbGbpT9Fdx41xtKiop96
# eiL6SJUfq/tHI4D1nvi/a7dLl+LrdXga7Oo3mXkYS//WsyNodeav+vyL6wuA6mk7
# r/ww7QRMjt/fdW1jkT3RnVZOT7+AVyKheBEyIXrvQQqxP/uozKRdwaGIm1dxVk5I
# RcBCyZt2WwqASGv9eZ/BvW1taslScxMNelDNMYIZjzCCGYsCAQEwgZUwfjELMAkG
# A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
# HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9z
# b2Z0IENvZGUgU2lnbmluZyBQQ0EgMjAxMQITMwAAAlKLM6r4lfM52wAAAAACUjAN
# BglghkgBZQMEAgEFAKCBrjAZBgkqhkiG9w0BCQMxDAYKKwYBBAGCNwIBBDAcBgor
# BgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIBFTAvBgkqhkiG9w0BCQQxIgQg0+awN74p
# AdKmnMMvkTWB/nG/037WMPMx1MxC+CqzAEowQgYKKwYBBAGCNwIBDDE0MDKgFIAS
# AE0AaQBjAHIAbwBzAG8AZgB0oRqAGGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbTAN
# BgkqhkiG9w0BAQEFAASCAQCLPF6FJXR/UoQvt/DmcK1Zgpq6ZzQDjhiifjMEpmjr
# ZrucxNcAzzAaiaRey5VfpH6b5fZAHkyRoMVeQvBmwZ9qirw8SeKDULqDwyJMbmW5
# 3W/JnwMm4xYOhFTtukYcm0I47Mj20gCPSsmbR44vkY2y2M4RA4lESOME/VkdsccR
# 4wo+IaN3UMUmwgqA573rHylZT5ZmO5Tsqd94cetAP7+3s0Q5ihZIHTqhAKbxM4Nx
# 8DdwFWKUqTdiEsrVCpHbs4ASIvkidXFPZuoOdHDfFGt0IA4KOxJmy/R7s+2pFdwl
# T/uho4cJqilfBbTTmGN2S9wuLY8GSwbdWynruln7ANfwoYIXGTCCFxUGCisGAQQB
# gjcDAwExghcFMIIXAQYJKoZIhvcNAQcCoIIW8jCCFu4CAQMxDzANBglghkgBZQME
# AgEFADCCAVkGCyqGSIb3DQEJEAEEoIIBSASCAUQwggFAAgEBBgorBgEEAYRZCgMB
# MDEwDQYJYIZIAWUDBAIBBQAEIKuX9hFoO1O1YdGZBdXXGWi3UAMd8W4A+Sqsx41D
# TpxKAgZhwh74CWsYEzIwMjIwMTE5MDA1NzAzLjY3MlowBIACAfSggdikgdUwgdIx
# CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
# b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsTJE1p
# Y3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMdVGhh
# bGVzIFRTUyBFU046OEQ0MS00QkY3LUIzQjcxJTAjBgNVBAMTHE1pY3Jvc29mdCBU
# aW1lLVN0YW1wIFNlcnZpY2WgghFoMIIHFDCCBPygAwIBAgITMwAAAYguzcaBQeG8
# KgABAAABiDANBgkqhkiG9w0BAQsFADB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
# V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0
# IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0Eg
# MjAxMDAeFw0yMTEwMjgxOTI3NDBaFw0yMzAxMjYxOTI3NDBaMIHSMQswCQYDVQQG
# EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
# A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMS0wKwYDVQQLEyRNaWNyb3NvZnQg
# SXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQxJjAkBgNVBAsTHVRoYWxlcyBUU1Mg
# RVNOOjhENDEtNEJGNy1CM0I3MSUwIwYDVQQDExxNaWNyb3NvZnQgVGltZS1TdGFt
# cCBTZXJ2aWNlMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmucQCAQm
# kcXHyDrV4S88VeJg2XGqNKcWpsrapRKFWchhjLsf/M9XN9bgznLN48BXPAtOlwoe
# dB2kN4bZdPP3KdRNbYq1tNFUh8UnmjCCr+CjLlrigHcmS0R+rsN2gBMXlLEZh2W/
# COuD9VOLsb2P2jDp433V4rUAAUW82M7rg81d3OcctO+1XW1h3EtbQtS6QEkw6DYI
# uvfX7Aw8jXHZnsMugP8ZA1otprpTNUh/zRWC7CJyBzymQIDSCdWhVfD4shxe+Rs6
# 1axf27bTg5H/V/SkNd9hzM6Nq/y2OjDKrLtuN9hS53569uhTNQeAhAVDfeHpEzlM
# vtXOyX6MTme3jnHdHPj6GLT9AMRIrAf96hPYOiPEBvHtrg6MpiI3+l6NlbSOs16/
# FTeljT1+sdsWGtFTZvea9pAqV1aB795aDkmZ6sRm5jtdnVazfoWrHd3vDeh35WV0
# 8vW4TlOfEcV2+KbairPxaFkJ4+tlsJ+MfsVOiTr/ZnDgaMaHnzzogelI3AofDU9I
# TbMkTtTxrLPygTbRdtbptrnLzBn2jzR4TJfkQo+hzWuaMu5OtMZiKV2I5MO0m1mK
# uUAgoq+442Lw8CQuj9EC2F8nTbJb2NcUDg+74dgJis/P8Ba/OrlxW+Trgc6TPGxC
# OtT739UqeslvWD6rNQ6UEO9f7vWDkhd2vtsCAwEAAaOCATYwggEyMB0GA1UdDgQW
# BBRkebVQxKO7zru9+o27GjPljMlKSjAfBgNVHSMEGDAWgBSfpxVdAF5iXYP05dJl
# pxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQhk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5j
# b20vcGtpb3BzL2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENBJTIwMjAx
# MCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwGCCsGAQUFBzAChlBodHRwOi8vd3d3
# Lm1pY3Jvc29mdC5jb20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUtU3Rh
# bXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMBAf8EAjAAMBMGA1UdJQQMMAoG
# CCsGAQUFBwMIMA0GCSqGSIb3DQEBCwUAA4ICAQBAEFrb+1gIJsv/GKLS2zavm2ek
# 177mk4yu6BuS6ViIuL0e20YN2ddXeiUhEdhk3FRto/GD93k5SIyNJ6X+p8uQMOxI
# 23YOSdyEzLJwh7+ftu0If8y3x6AJ0S1d12OZ7fsYqljHUeccneS9DWqipHk8uM8m
# 2ZbBhRnUN8M4iqg4roJGmZKZ9Fc8Z7ZHJgM97i7fIyA9hJH017z25WrDJlxapD5d
# mMyNyzzfAVqaByemCoBn4VkRCGNISx0xRlcb93W6ENhJF1NBjMl3cKVEHW4d8Y0N
# ZhpdXDteLk9HgbJyeCI2fN9GBrCS1B1ak+194PGiZKL8+gtK7NorAoAMQvFkYgrH
# rWCYfjV6PouC3N+A6wOBrckVOHT9PUIDK5ADCH4ZraQideS9LD/imKHM3I4iazPk
# ocHcFHB9yo5d9lMJZ+pnAAWglQQjMWhUqnE/llA+EqjbO0lAxlmUtVioVUswhT3p
# K6DjFRXM/LUxwTttufz1zBjELkRIZ8uCy1YkMxfBFwEos/QFIlDaFSvUn4IiWZA3
# VLfAEjy51iJwK2jSIHw+1bjCI+FBHcCTRH2pP3+h5DlQ5AZ/dvcfNrATP1wwz25I
# r8KgKObHRCIYH4VI2VrmOboSHFG79JbHdkPVSjfLxTuTsoh5FzoU1t5urG0rwulo
# ZZFZxTkrxfyTkhvmjDCCB3EwggVZoAMCAQICEzMAAAAVxedrngKbSZkAAAAAABUw
# DQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
# dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
# YXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhv
# cml0eSAyMDEwMB4XDTIxMDkzMDE4MjIyNVoXDTMwMDkzMDE4MzIyNVowfDELMAkG
# A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
# HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9z
# b2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAw
# ggIKAoICAQDk4aZM57RyIQt5osvXJHm9DtWC0/3unAcH0qlsTnXIyjVX9gF/bErg
# 4r25PhdgM/9cT8dm95VTcVrifkpa/rg2Z4VGIwy1jRPPdzLAEBjoYH1qUoNEt6aO
# RmsHFPPFdvWGUNzBRMhxXFExN6AKOG6N7dcP2CZTfDlhAnrEqv1yaa8dq6z2Nr41
# JmTamDu6GnszrYBbfowQHJ1S/rboYiXcag/PXfT+jlPP1uyFVk3v3byNpOORj7I5
# LFGc6XBpDco2LXCOMcg1KL3jtIckw+DJj361VI/c+gVVmG1oO5pGve2krnopN6zL
# 64NF50ZuyjLVwIYwXE8s4mKyzbnijYjklqwBSru+cakXW2dg3viSkR4dPf0gz3N9
# QZpGdc3EXzTdEonW/aUgfX782Z5F37ZyL9t9X4C626p+Nuw2TPYrbqgSUei/BQOj
# 0XOmTTd0lBw0gg/wEPK3Rxjtp+iZfD9M269ewvPV2HM9Q07BMzlMjgK8QmguEOqE
# UUbi0b1qGFphAXPKZ6Je1yh2AuIzGHLXpyDwwvoSCtdjbwzJNmSLW6CmgyFdXzB0
# kZSU2LlQ+QuJYfM2BjUYhEfb3BvR/bLUHMVr9lxSUV0S2yW6r1AFemzFER1y7435
# UsSFF5PAPBXbGjfHCBUYP3irRbb1Hode2o+eFnJpxq57t7c+auIurQIDAQABo4IB
# 3TCCAdkwEgYJKwYBBAGCNxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQUKqdS/mTE
# mr6CkTxGNSnPEP8vBO4wHQYDVR0OBBYEFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMFwG
# A1UdIARVMFMwUQYMKwYBBAGCN0yDfQEBMEEwPwYIKwYBBQUHAgEWM2h0dHA6Ly93
# d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTATBgNV
# HSUEDDAKBggrBgEFBQcDCDAZBgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNV
# HQ8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo
# 0T2UkFvXzpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29m
# dC5jb20vcGtpL2NybC9wcm9kdWN0cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5j
# cmwwWgYIKwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jv
# c29mdC5jb20vcGtpL2NlcnRzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNydDAN
# BgkqhkiG9w0BAQsFAAOCAgEAnVV9/Cqt4SwfZwExJFvhnnJL/Klv6lwUtj5OR2R4
# sQaTlz0xM7U518JxNj/aZGx80HU5bbsPMeTCj/ts0aGUGCLu6WZnOlNN3Zi6th54
# 2DYunKmCVgADsAW+iehp4LoJ7nvfam++Kctu2D9IdQHZGN5tggz1bSNU5HhTdSRX
# ud2f8449xvNo32X2pFaq95W2KFUn0CS9QKC/GbYSEhFdPSfgQJY4rPf5KYnDvBew
# VIVCs/wMnosZiefwC2qBwoEZQhlSdYo2wh3DYXMuLGt7bj8sCXgU6ZGyqVvfSaN0
# DLzskYDSPeZKPmY7T7uG+jIa2Zb0j/aRAfbOxnT99kxybxCrdTDFNLB62FD+Cljd
# QDzHVG2dY3RILLFORy3BFARxv2T5JL5zbcqOCb2zAVdJVGTZc9d/HltEAY5aGZFr
# DZ+kKNxnGSgkujhLmm77IVRrakURR6nxt67I6IleT53S0Ex2tVdUCbFpAUR+fKFh
# bHP+CrvsQWY9af3LwUFJfn6Tvsv4O+S3Fb+0zj6lMVGEvL8CwYKiexcdFYmNcP7n
# tdAoGokLjzbaukz5m/8K6TT4JDVnK+ANuOaMmdbhIurwJ0I9JZTmdHRbatGePu1+
# oDEzfbzL6Xu/OHBE0ZDxyKs6ijoIYn/ZcGNTTY3ugm2lBRDBcQZqELQdVTNYs6Fw
# ZvKhggLXMIICQAIBATCCAQChgdikgdUwgdIxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
# EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
# ZnQgQ29ycG9yYXRpb24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5kIE9wZXJh
# dGlvbnMgTGltaXRlZDEmMCQGA1UECxMdVGhhbGVzIFRTUyBFU046OEQ0MS00QkY3
# LUIzQjcxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2WiIwoB
# ATAHBgUrDgMCGgMVAOE8isx8IBeVPSweD805l5Qdeg5CoIGDMIGApH4wfDELMAkG
# A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
# HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9z
# b2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwDQYJKoZIhvcNAQEFBQACBQDlkYayMCIY
# DzIwMjIwMTE5MDIzNDI2WhgPMjAyMjAxMjAwMjM0MjZaMHcwPQYKKwYBBAGEWQoE
# ATEvMC0wCgIFAOWRhrICAQAwCgIBAAICC8cCAf8wBwIBAAICETcwCgIFAOWS2DIC
# AQAwNgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGEWQoDAqAKMAgCAQACAwehIKEK
# MAgCAQACAwGGoDANBgkqhkiG9w0BAQUFAAOBgQBMl47CA+Lfl+0HVwWRMiTBFKnM
# MmYCFHftTgObn7KoLlLNOplOY3Y3dm26nwYqXmwoGa9k9pmOMZmVQViuVTNAqfJh
# 2VZqjQKFAadHPTjWs+/rP9jnNVs9S53c3h4zSCm8OzeWleMP+grxPQ70MSoXEpwV
# gm92H/HDAh/TVdyhKDGCBA0wggQJAgEBMIGTMHwxCzAJBgNVBAYTAlVTMRMwEQYD
# VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1w
# IFBDQSAyMDEwAhMzAAABiC7NxoFB4bwqAAEAAAGIMA0GCWCGSAFlAwQCAQUAoIIB
# SjAaBgkqhkiG9w0BCQMxDQYLKoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkEMSIEIPIV
# liUbxbHBT7UsTlwwi1sO5ucgvPQ4W1VYA6ge5OUyMIH6BgsqhkiG9w0BCRACLzGB
# 6jCB5zCB5DCBvQQgZune7awGN0aEgvjP7JyO3NKl7hstX8ChhrKmXtJJQKUwgZgw
# gYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
# BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
# VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAYguzcaBQeG8
# KgABAAABiDAiBCAc3zYfWgLLJ/Y+vk3ORjEc2Eu1G6oDrcRqpvQMo2kCDTANBgkq
# hkiG9w0BAQsFAASCAgCCoz5Q/H3PWn9F6Or8GNilaz3DiWgN3Wqu9xYC3bE3vMtD
# NLBbLAzi5RyPzZwTV6v2FuOSyFFAr3UQrdivPH4LAwVEAyMiQDnsz8Jg5pefuf8B
# vFK6NqgYYwokx5HHRtuk1/8R7ZlqsrAJ6P50fv0ux5N56R6B34IF5eJUdbqWKo7h
# aRsIz7FWZbzUknwwHVqvWmVUoJu7Uvxrk1FdLRw+k18JamDFrgz36vySnrnBnh2V
# gQqwAED6AOvEjBy6ZFsfjsaJMBFtlDqS5ma4GF6tLA7YzpEA3Bhfnp49UZGhIMh1
# vomyeT/BEnpTmCVPKtWHOsVyxfc3egsTHsJc/vBZykpouOzjalvEBMZHyVViFG2s
# JXf7u5qRJPn9z7eGY/kf/l+iVC86t2AVf4mJOtATPpgxHvVr65jZwO9JahVrsVyL
# Q/ZdGLs2XLdWSx340TI2XQb8JHcwQNczA5ygpoZqO0WhSKRDjrPAd5sEF7bTSc1s
# JwfD06sPnV+xIaUPkHZy6B+fKDvpe+WysU5xBUpYGuHXBU4KGDMQN0PA9QmKUufD
# Ap6t7xtB3ArpyRMJ0axVWlUyYhrsJNhzZ+tzzSxN+817eyoQOlkufEycR6KSCPSF
# gNrdw2CGcrmfSsTbeH7PrAEcg1m0eUMA/Ax5ozNTQYxk78m4iZWjYD1tqXaMWA==
# SIG # End signature block
