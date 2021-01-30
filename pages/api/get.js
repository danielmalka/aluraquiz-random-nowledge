import fs from 'fs'

export default function getAllContribuitors(request, response) {
  let testFolder = "home/danlemos/javascript/aluraquiz-base/contributors";
  fs.readdirSync(testFolder).forEach(file => {
    let filepath = testFolder + "\\" + file;
    fs.readFile(filepath, 'utf-8', function(err, data){
      let linhas = data.split(/\r?\n/);
      console.log(linhas[1]);
    })
  });
}
