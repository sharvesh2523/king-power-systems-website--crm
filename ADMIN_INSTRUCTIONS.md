# Admin User Setup Instructions

## New Admin Credentials
- **Email**: admin@kingpowersystem.in
- **Password**: KingPower@123

## How to Set Up the Admin User

1. Start the development server:
   ```
   npm run dev
   ```

2. Navigate to the admin login page:
   http://localhost:3000/admin

3. Register a new user with the credentials above, or if registration is not available:
   - Use the sign-up functionality if available
   - Or manually add the user to the database

## Alternative Method (if direct registration is not possible)

If you cannot register directly through the UI, you may need to manually insert the user into the database using the following steps:

1. Make sure the application is running
2. Use a database client to connect to your SQLite database
3. Insert a new user record with the email and a hashed password

## Verification

After creating the admin user, you should be able to log in at:
http://localhost:3000/admin

Using the credentials:
- Email: admin@kingpowersystem.in
- Password: KingPower@123