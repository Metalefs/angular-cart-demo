import { Produto } from 'libs/data/src/lib/classes';

export function getPreviewURL($event: { target: { files: any; }; },fileNames: any,callback: any){

  let filelist = $event.target.files;

  return preview(filelist,fileNames,callback);
}

function preview(files: string | any[],fileNames: string,callback: (arg0: string | ArrayBuffer | null, arg1: any) => void) {
  if (files.length === 0)
    return;

  var mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    fileNames = "Só imagens são suportadas.";
    return;
  }
  for(let i =0; i < files.length; i++){
    fileNames+= files[i].name+',';
  }
  var reader = new FileReader();
  reader.readAsDataURL(files[0]);
  let res : string | ArrayBuffer;
  reader.onload = (_event) => {
    callback(reader.result,fileNames);
  }
}
