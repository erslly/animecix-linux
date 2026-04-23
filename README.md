# Animecix Linux

Animecix için geliştirilmiş, performans odaklı ve modern özelliklere sahip unofficial masaüstü istemcisi.

![Animecix](animecix.png)

## Özellikler

- **Yüksek Performans:** Wayland ve modern GPU hızlandırma (VA-API) desteği.
- **Frameless Tasarım:** Modern ve sade arayüz (Drag & Drop desteği).
- **Çoklu Paket Desteği:** AUR, AppImage, DEB ve Pacman formatları.

## Kurulum

### Arch Linux (AUR)
En kolay yöntem AUR üzerinden kurmaktır:
```bash
yay -S animecix-linux
```

### Diğer Dağıtımlar
[Releases](https://github.com/erslly/animecix-linux/releases) sayfasından `.AppImage` veya `.deb` paketlerini indirip kullanabilirsiniz.

## Geliştiriciler İçin

### Adımlar
1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/erslly/animecix-linux.git
   cd animecix-linux
   ```

2. Bağımlılıkları yükleyin ve çalıştırın:
   ```bash
   npm install
   npm start
   ```

### Dağıtım (Build)
```bash
npm run dist
```

## Kısayollar
- `ESC`: Bir önceki sayfaya geri dön.
- `F11`: Tam ekran modu.
