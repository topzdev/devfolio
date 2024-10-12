import { v2 as cloudinary } from 'cloudinary';
import {env} from "~/env";

cloudinary.config({
    cloud_name: env.CLOUDINARY_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;

