module.exports = Object.freeze({
    UPLOADED_FILE_PATH: 'C:/Users/chapa/Desktop/temple_uploaded/temple_uploaded_files/',
    UPLOADED_IMAGE_PATH: 'C:/Users/chapa/Desktop/temple_uploaded/temple_uploaded_images/',
    SERVED_DIRECTORY: 'C:/Users/chapa/Desktop/temple_uploaded',
    DOWNLOADABLE_FILE_URL: 'https://localhost:3000/temple_uploaded_files/',
    DOWNLOADABLE_IMAGE_URL: 'https://localhost:3000/temple_uploaded_images/',
    PRIVATE_KEY_PATH: 'C:/Users/chapa/Desktop/repos/TempleServer/helpers/secrets/private_key.txt', // need rsa private key in pair with ui public key
    USER_ROLE: Object.freeze({ 
        ADMIN: 'Admin',
        SUPER_ADMIN: 'Super Admin',
        GENERAL_USER: 'General User'
    })
});