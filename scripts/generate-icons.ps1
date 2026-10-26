Add-Type -AssemblyName System.Drawing

$sourcePath = Resolve-Path "public/images/profile/profile.jpeg"
$sourceImg = [System.Drawing.Image]::FromFile($sourcePath)

function Resize-Image($width, $height, $destPath, $isMaskable = $false) {
    $bmp = New-Object System.Drawing.Bitmap $width, $height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    if ($isMaskable) {
        # Fill background with portfolio theme dark surface #0f1117
        $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#0f1117"))
        $g.FillRectangle($bgBrush, 0, 0, $width, $height)
        $bgBrush.Dispose()

        # 80% safe zone inner crop
        $padding = [int]($width * 0.10)
        $drawSize = $width - (2 * $padding)
        $destRect = New-Object System.Drawing.Rectangle $padding, $padding, $drawSize, $drawSize
        $g.DrawImage($sourceImg, $destRect, 0, 0, $sourceImg.Width, $sourceImg.Height, [System.Drawing.GraphicsUnit]::Pixel)
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
        $destRect = New-Object System.Drawing.Rectangle 0, 0, $width, $height
        $g.DrawImage($sourceImg, $destRect, 0, 0, $sourceImg.Width, $sourceImg.Height, [System.Drawing.GraphicsUnit]::Pixel)
    }

    $g.Dispose()
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated: $destPath ($width x $height)"
}

Resize-Image 192 192 "public/icons/icon-192.png" $false
Resize-Image 512 512 "public/icons/icon-512.png" $false
Resize-Image 512 512 "public/icons/icon-maskable-512.png" $true
Resize-Image 180 180 "public/icons/apple-touch-icon.png" $false
Resize-Image 32 32 "public/icons/favicon-32.png" $false

$sourceImg.Dispose()
Write-Host "All icons generated successfully!"
