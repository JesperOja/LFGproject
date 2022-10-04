import { Profile } from "./profile";
import { User} from './user';
import { Game} from './game';
import { Post} from './post';

Profile.hasMany(Game);
Profile.hasMany(Post);
Game.belongsTo(Profile);
Post.belongsTo(Profile);

Profile.sync({alter: true});
User.sync();
Game.sync({alter: true});
Post.sync({alter: true});

export {Profile, User, Game, Post};