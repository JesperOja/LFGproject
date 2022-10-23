export interface Game {
    id?: number;
    name: string;
    nicknameIngame?: string;
    hours?: number;
    rank?: string;
    server?: string;
    comments?: string;
    profileId: number;
}

export interface ProfileModel {
    id?: number;
    username: string;
    firstname?: string;
    lastname?: string;
    age?: number;
    discord?: string;
    joiningDate?: string;
    avatar?: string;
    email: string;
    games?: Game[];
    posts?: Post[];
}

export interface Login {
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface Post {
    id?: number;
    title: string;
    createdAt?: string;
    content: string;
    profileId: number;
    likes?: number;
    dislikes?: number;
    comments?: Comment[];
}

export interface Comment {
    id?: number;
    comment: string;
    postId: number;
    posterId: number;
    createdAt?: string;
}