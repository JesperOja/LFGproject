import { Profile } from "./profile";
import { User} from './user';
import { Game} from './game';
import { Post} from './post';
import { Comment } from './comment';

Profile.hasMany(Game);
Profile.hasMany(Post);
Post.hasMany(Comment);

Comment.belongsTo(Profile);
Comment.belongsTo(Post);
Game.belongsTo(Profile);
Post.belongsTo(Profile);

Profile.sync({alter: true});
User.sync();
Game.sync({alter: true});
Post.sync({alter: true});
Comment.sync({alter: true});

export {Profile, User, Game, Post, Comment};