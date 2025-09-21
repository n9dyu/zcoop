import SignIn from "@/app/(auth)/sign-in";
import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.agp.zcoop",
    databaseId: '68cf26d60033855c5967',
    userCollectionId: 'user'
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectID!)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const daatbases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name}: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(!newAccount) throw Error;

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);
        return await daatbases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id,  avatar: avatarUrl }
        );
    } catch (e) {
        throw new Error(e as string);
    }
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await daatbases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', [currentAccount.$id])]
        )

        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}