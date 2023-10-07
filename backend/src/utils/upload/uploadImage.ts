import AWS from "aws-sdk";
import moment from "moment";
const uploadImage = async (file: any) => {
  const { stream, filename, mimetype, encoding, createReadStream } = await file;
  const Body = createReadStream();
  const s3 = new AWS.S3({
    endpoint: "sgp1.digitaloceanspaces.com",
    accessKeyId: "DO0066FN8XATJY3QMF8W",
    secretAccessKey: "D5WI7xW+c+pTmlbuRWZQGVgTslSDsmevxmCWA4Ape5k",
  });

  const date = moment().format("YYYYMMDD");
  const randomString = Math.random().toString(36).substring(2, 7);
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newFilename = `ondc/${date}-${randomString}-${cleanFileName}`;
  const params = {
    Bucket: "pulseplaydigital",
    Key: newFilename,
    Body,
    ACL: "public-read",
    ContentType: mimetype,
  };
  const data1 = await s3.upload(params).promise();
  const { Location } = data1;
  console.log(data1);
  const data = {
    imgUrl: `/${newFilename}`,
  };
  console.log(data);

  return data.imgUrl;
};

export default uploadImage;
