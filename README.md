# NFTPort search engine front end 
https://nftport.xyz/

## Instructions
```
cd package_code
npm install
npm start
```
Open [http://localhost:1234](http://localhost:1234).

## Deployment
```
npm run build
delete all files from ("Sentinel Static websites" organization) gs://nft-search, except "img" folder
put all files from project "dist" folder to gs://nft-search
```