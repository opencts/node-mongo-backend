import mongoose from 'mongoose';

global.Text = 'Text'; // Store String that correspond to mongo String dataType
global.Email = 'Email'; // Store email 
global.Password = 'Password'; // Store password 
global.File = 'File'; // Store file but it uploadUrl in mongo db,
global.Date = Date;
global.Number = Number;
global.Boolean = Boolean;
global.ObjectId = mongoose.Types.ObjectId;

export default {}; 