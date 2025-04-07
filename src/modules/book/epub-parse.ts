import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as fse from 'fs-extra';
import * as AdmZip from 'adm-zip';
import * as XmlJS from 'xml2js';
import { NGINX_PATH } from 'src/utils/const';

export function unzip(bookPath, unzipPath) {
  const zip = new AdmZip(bookPath);
  zip.extractAllTo(unzipPath, true);
}

export function parseRootFile(unzipPath) {
  const containerFilePath = path.resolve(unzipPath, 'META-INF/container.xml');
  const containerXml = fs.readFileSync(containerFilePath, 'utf-8');
  //  console.log(containerXml)
  //  mac电脑 解压之后多了一层文件夹，临时将二层文件内容提取到一层内
  const { parseStringPromise } = XmlJS;
  return parseStringPromise(containerXml, {
    explicitArray: false,
  }).then((data) => {
    // console.log(data, data.container.rootfiles)
    return data.container.rootfiles.rootfile['$']['full-path'];
  });
}

export function parseContentOpf(unzipPath, filePath, fileName) {
  // 拿到content.opf路径
  const fullPath = path.resolve(unzipPath, filePath);
  const contentOpf = fs.readFileSync(fullPath, 'utf-8');
  // console.log(fullPath, unzipPath);
  // console.log(contentOpf)
  const { parseStringPromise } = XmlJS;
  return parseStringPromise(contentOpf, {
    explicitArray: false,
  }).then(async (data) => {
    // console.log(data, data.container.rootfiles)
    const { metadata } = data.package;
    // console.log(metadata)
    const title = metadata['dc:title'];
    const creator = metadata['dc:creator'];
    const language = metadata['dc:language'];
    const publisher = metadata['dc:publisher'];
    const coverMeta = metadata.meta.find((meta) => meta['$'].name == 'cover');
    const coverId = coverMeta['$'].content;
    const manifest = data.package.manifest.item;
    const coverRes = manifest.find((m) => m['$'].id === coverId);
    // 不需要fullpath的内容，只需要这个路径的文件夹 ❤️
    const dir = path.dirname(fullPath);
    const cover = path.resolve(dir, coverRes['$'].href);

    console.log(`电子书信息：
    书名： ${title},
    作者： ${creator},
    语言： ${language},
    厂商： ${publisher},
    封面： ${cover}
    `);

    const rootDir = path.dirname(filePath);
    const content = await parseContent(dir, 'toc.ncx', rootDir, fileName);
    // console.log(content)
    return {
      title,
      creator,
      language,
      publisher,
      cover,
      content,
      rootFile: filePath,
    };
  });
}

export async function parseContent(contentDir, contentFilePath, rootDir, fileName) {
  const contentPath = path.resolve(contentDir, contentFilePath);
  const contentXml = fs.readFileSync(contentPath, 'utf-8');
  // console.log(contentXml);
  const { parseStringPromise } = XmlJS;
  const data = await parseStringPromise(contentXml, {
    explicitArray: false,
  });
  const navMap = data.ncx.navMap.navPoint;
  const fileNameWithoutSuffix = fileName.replace('.epub', '')
  // console.log(navMap)

  const navData = navMap.map((nav) => {
    const id = nav['$'].id;
    const playOrder = +nav['$'].playOrder;
    const text = nav.navLabel.text;
    const href = nav.content['$'].src;

    return {
      id,
      playOrder,
      text,
      href: `${fileNameWithoutSuffix}/${rootDir}/${href}`,
    };
    // console.log(, text, href)
  });
  return navData;
  // console.log('navData', navData);
}

export async function copyCoverImage(data, tmpDir) {
  const { cover } = data;
  if (!cover) {
    return;
  }
  const coverPathname = cover.replace(tmpDir + '/', '');
  const coverDir = path.resolve(NGINX_PATH, 'cover');
  const coverNewPath = path.resolve(coverDir, coverPathname);
  await fse.mkdirpSync(coverDir);
  await fse.copySync(cover, coverNewPath);
  return coverPathname;
}

export function copyUnzipBook(tmpDir, dirName) {
  const bookDir = path.resolve(NGINX_PATH, 'book', dirName);

  fse.mkdirpSync(bookDir);
  fse.copySync(tmpDir, bookDir);
  // return coverPathname;
}
