const bcrypt = require('bcryptjs');
export const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Please type a username'],
			unique: [true, 'This username is already in use'],
		},
		role: {
			type: String,
			enum: ['user', 'professional'],
			default: 'user',
		},
		email: {
			type: String,
			required: [true, 'Please type a email'],
			unique: [true, 'This email is already in use'],
		},

		photo: {
			type: String,
			default:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRAhE9DUIhm4jhJDKKsQT2qq4WRSv9n7rHBig&usqp=CAU',
		},

		password: {
			type: String,
			required: [true, 'Please type a password!'],
		},

		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		isProfessional: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassword: unknown) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (this: any, next: any) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
