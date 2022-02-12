function loadImage(img: HTMLImageElement | PromiseLike<HTMLImageElement>, src: any):Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
      (img as any).src = src;
      (img as any).completed ? resolve(img) : (img as any).addEventListener('load', function () {
          resolve(img as HTMLImageElement)
      });
      (img as any).addEventListener('error', reject);
  })
}

export function resizeImage(src: string, options: { width: any; height?: any; type?: any; quality?: any; }):Promise<Blob> {

  return loadImage(document.createElement('img'), src).then( (image:HTMLImageElement) =>{

      var canvas = document.createElement('canvas');

      if (options.width && !options.height) {
          options.height = image.height * (options.width / image.width)
      } else if (!options.width && options.height) {
          options.width = image.width * (options.height / image.height)
      }

      Object.assign(canvas, options);

      canvas!.getContext('2d')!.drawImage(image, 0, 0, canvas.width, canvas.height);

      return new Promise(function (resolve) {
          canvas.toBlob(resolve as any, options.type || 'image/png', options.quality)
      })
  })
}
