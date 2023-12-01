import mongoose from 'mongoose';

export async function connect() {
    try {
        // provide the connection URI and use ! to cofirm it will always be available
        mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!);

        // connect to database
        const connection = mongoose.connection;
        
        // when connected log message
        connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        // listen to errors
        connection.on('error', (error) => {
            console.log(`MongoDB connection error: ${error}`);
            
            // make a graceful exit
            process.exit();
        })
    
    } catch (error) {
        console.log('Could not connect to MongoDB');
        console.log(error);
    }
}