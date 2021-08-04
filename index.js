//require('dotenv').config()
const client = require('twitter-api-client');
const axios = require('axios');
const fs = require('fs');
const jimp = require('jimp');

const twitterClient = new client.TwitterClient({
  apiKey: "YOUR_API_KEY",
  apiSecret: "YOUR_API_SECRET",
  accessToken: "YOUR_ACCESS_TOKEN",
  accessTokenSecret: "YOUR_ACCESS_TOKEN_SECRET"
  });
// Test the twitter-api-client
// async function test() {
// const data = await twitterClient.accountsAndUsers.followersList({ screen_name: 'VladSalguero', count: 3 });

//   console.log(data.users)
// }

// test()

//push the url of profile image recent followers
let image_url = [];

//check below drawit()
let lastDrawImage = 0;

//function to download image
const download_image = (url, image_path) =>
axios({
  url,
  responseType: 'stream',
}).then(
  response =>
    new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream(image_path))
        .on('finish', () => resolve())
        .on('error', e => reject(e));
    }),
);

  // function to draw image and post it
  async function drawImage(back, img1, img2, img3, img4, img5, img6, img7, img8,img9, img10, img11, img12, img13, img14, img15, img16){
    //Creating an array so it becomes easier to Promise.all instead of one at a time
    //Would love to see if you have any other approach to this, can't think of anything else
    let imgArr = [back, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16];
  
    let jimps = [];
  
    //Read the image in jimp and push it to jimps array 
    imgArr.forEach(image => jimps.push(jimp.read(image)));
  
    // fetch all the images
    Promise.all(jimps).then(data => {
      return Promise.all(jimps)
    }).then(data => {
      // composite the images on one another
      data[0].composite(data[1],800,50); //800 is X position, 50 is Y position for each profile image
      data[0].composite(data[2],890,50);
      data[0].composite(data[3],980,50);
      data[0].composite(data[4],1070,50); 
      data[0].composite(data[5],1160,50); 
      data[0].composite(data[6],1250,50); 
      data[0].composite(data[7],1340,50); 
      data[0].composite(data[8],1430,50);
      
      //second file
      data[0].composite(data[9],800,180); //800 is X position, 180 is Y position for each profile image
      data[0].composite(data[10],890,180);
      data[0].composite(data[11],980,180);
      data[0].composite(data[12],1070,180); 
      data[0].composite(data[13],1160,180); 
      data[0].composite(data[14],1250,180); 
      data[0].composite(data[15],1340,180); 
      data[0].composite(data[16],1430,180);
  
      // Write the image and save it
      data[0].write('1500x500.png', function(){
        console.log("done");
      })
    })
  
    // encode to base64 to post the image
    const base64 = await fs.readFileSync('1500x500.png', { encoding: 'base64' });
    // console.log(base64);
  
    // Update the banner
    await twitterClient.accountsAndUsers.accountUpdateProfileBanner({banner: base64});
  }

async function start() {

  const name = Math.random();
  const params = {
    screen_name: 'VladSalguero', //name of twitter account
    count: 8                     //number of followers to be fetched
  }
  // fetch followers
  const followers = await twitterClient.accountsAndUsers.followersList(params);
  // fetch following
  const following = await twitterClient.accountsAndUsers.friendsList(params);

  //push url of profile image to array
  followers.users.forEach(item => {
    image_url.unshift(item.profile_image_url_https)
  });


  following.users.forEach(item => {
    image_url.unshift(item.profile_image_url_https)
    console.log(item);
  });
  
  (async () => {
    //download the image
    await download_image(image_url[0], `${name}-1.png`)
    await download_image(image_url[1], `${name}-2.png`)
    await download_image(image_url[2], `${name}-3.png`)
    await download_image(image_url[3], `${name}-4.png`)
    await download_image(image_url[4], `${name}-5.png`)
    await download_image(image_url[5], `${name}-6.png`)
    await download_image(image_url[6], `${name}-7.png`)
    await download_image(image_url[7], `${name}-8.png`)

    
    await download_image(image_url[8], `${name}-9.png`)
    await download_image(image_url[9], `${name}-10.png`)
    await download_image(image_url[10], `${name}-11.png`)
    await download_image(image_url[11], `${name}-12.png`)
    await download_image(image_url[12], `${name}-13.png`)
    await download_image(image_url[13], `${name}-14.png`)
    await download_image(image_url[14], `${name}-15.png`)
    await download_image(image_url[15], `${name}-16.png`)

  async function drawit() {
    lastDrawImage = Date.now();
    // Draw the image and Post it
    await drawImage('1500x500.png' ,`${name}-1.png`,`${name}-2.png`,`${name}-3.png`,`${name}-4.png`,`${name}-5.png`,`${name}-6.png`, `${name}-7.png`, `${name}-8.png`,`${name}-9.png`,`${name}-10.png`,`${name}-11.png`,`${name}-12.png`,`${name}-13.png`,`${name}-14.png`, `${name}-15.png`, `${name}-16.png`);
  }
  const remaining = Date.now() - lastDrawImage;
  
  // Avoid hitting rate limit when update banner
  // 30 requests per 15 mins meaning 1 request per 30 secs
  if (remaining > 30000) {
    await drawit();
  }

  async function deleteImages() {
    try{
      console.log('removing', `${name}{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16}.png`);
      await fs.unlinkSync(`${name}-1.png`);
      await fs.unlinkSync(`${name}-2.png`);
      await fs.unlinkSync(`${name}-3.png`);
      await fs.unlinkSync(`${name}-4.png`);
      await fs.unlinkSync(`${name}-5.png`);
      await fs.unlinkSync(`${name}-6.png`);
      await fs.unlinkSync(`${name}-7.png`);
      await fs.unlinkSync(`${name}-8.png`);
      await fs.unlinkSync(`${name}-9.png`);
      await fs.unlinkSync(`${name}-10.png`);
      await fs.unlinkSync(`${name}-11.png`);
      await fs.unlinkSync(`${name}-12.png`);
      await fs.unlinkSync(`${name}-13.png`);
      await fs.unlinkSync(`${name}-14.png`);
      await fs.unlinkSync(`${name}-15.png`);
      await fs.unlinkSync(`${name}-16.png`);
    }catch(e){
      console.log(e);
    }
  }

  await deleteImages();

})();

}

// start everything
start();
setInterval(() => {
  start(); 
}, 6000);