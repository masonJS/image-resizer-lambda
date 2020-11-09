# image-resizer lambda

This lambda function is resizing image file.  
As image resizing modules, I used sharp, @gumlet/gif-resize modules.  
Because sharp module not supported by gif image file,I used @gumlet/gif-resize module in addition.   
After image conversion, This function uploads the converted image to s3 and deletes the original image to s3.


## Setting up

1. Create S3 Bucket

2. AWS CLI Setting
- [Configuration and credential file settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

 
3. installation
````
 $ npm install serverlss -g
 $ npm install
 $ serverless develop 
````
