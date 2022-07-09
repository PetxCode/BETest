const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const GOOGLE_SECRET = "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";
const GOOGLE_ID =
	"717654860266-4jdicf1esea6bemik2s1duf52dh3tc76.apps.googleusercontent.com";
const GOOGLE_REFRESHTOKEN =
	"1//04Px4yxSiBhMyCgYIARAAGAQSNwF-L9IrrIyoTWoDyjIGyPVkgzSVVSILDZWg4OzXbbcH7B-7bOohKsTPhz1CXZfY-1oDtbpXF4M";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ refresh_token: GOOGLE_REFRESHTOKEN });
const url = "https://onechurchnetwork.herokuapp.com";
// const mainURL = "http://localhost:2233"
// const url = localURL;

const verifiedUser = async (email, user, value) => {
	try {
		const accessToken = await oAuth.getAccessToken();
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "d1churchnetwork@gmail.com",
				refreshToken: accessToken.token,
				clientId: GOOGLE_ID,
				clientSecret: GOOGLE_SECRET,
				accessToken: GOOGLE_REFRESHTOKEN,
			},
		});

		const mailOptions = {
			from: "no-reply✉️  <d1churchnetwork@gmail.com>",
			to: email,
			subject: "Account Verification",
			html: ` <h3>
            This mail, is for account verification... Please use the <a
            href="${url}/api/admin/${user}/${value}"
            >Link to Finish</a> up your account creation 
        </h3>`,
		};

		const result = transporter.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
};

const verifiedSignUser = async (email, user, value) => {
	try {
		const accessToken = await oAuth.getAccessToken();
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "d1churchnetwork@gmail.com",
				refreshToken: accessToken.token,
				clientId: GOOGLE_ID,
				clientSecret: GOOGLE_SECRET,
				accessToken: GOOGLE_REFRESHTOKEN,
			},
		});

		const mailOptions = {
			from: "no-reply✉️  <d1churchnetwork@gmail.com>",
			to: email,
			subject: "Account re-Verification",
			html: ` <h3>
            This mail, is for account verification... Please use the <a
            href="${url}/api/admin/${user}/${value}"
            >Link to Finish</a> up your account creation 
        </h3>`,
		};

		const result = transporter.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
};

const resetUserPassword = async (email, user, value) => {
	try {
		const accessToken = await oAuth.getAccessToken();
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "d1churchnetwork@gmail.com",
				refreshToken: accessToken.token,
				clientId: GOOGLE_ID,
				clientSecret: GOOGLE_SECRET,
				accessToken: GOOGLE_REFRESHTOKEN,
			},
		});

		const mailOptions = {
			from: "no-reply✉️  <d1churchnetwork@gmail.com>",
			to: email,
			subject: "Password Reset Request",
			html: ` <h3>
            This mail, is for account verification... Please use the <a
            href="${url}/api/admin/change/${user}/${value}"
            >Link to Finish</a> up your account creation 
        </h3>`,
		};

		const result = transporter.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
};

const verifiedMember = async (email, user, value) => {
	try {
		const accessToken = await oAuth.getAccessToken();
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "d1churchnetwork@gmail.com",
				refreshToken: accessToken.token,
				clientId: GOOGLE_ID,
				clientSecret: GOOGLE_SECRET,
				accessToken: GOOGLE_REFRESHTOKEN,
			},
		});

		const mailOptions = {
			from: "no-reply✉️  <d1churchnetwork@gmail.com>",
			to: email,
			subject: "Account Verification",
			html: ` <h3>
            This mail, is for account verification... Please use the <a
            href="${url}/api/member/${user}/${value}"
            >Link to Finish</a> up your account creation 
        </h3>`,
		};

		const result = transporter.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
};

const verifiedSignMember = async (email, user, value) => {
	try {
		const accessToken = await oAuth.getAccessToken();
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "d1churchnetwork@gmail.com",
				refreshToken: accessToken.token,
				clientId: GOOGLE_ID,
				clientSecret: GOOGLE_SECRET,
				accessToken: GOOGLE_REFRESHTOKEN,
			},
		});

		const mailOptions = {
			from: "no-reply✉️  <d1churchnetwork@gmail.com>",
			to: email,
			subject: "Account re-Verification",
			html: ` <h3>
            This mail, is for account verification... Please use the <a
            href="${url}/api/member/${user}/${value}"
            >Link to Finish</a> up your account creation 
        </h3>`,
		};

		const result = transporter.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
};

const resetMemberPassword = async (email, user, value) => {
	try {
		const accessToken = await oAuth.getAccessToken();
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "d1churchnetwork@gmail.com",
				refreshToken: accessToken.token,
				clientId: GOOGLE_ID,
				clientSecret: GOOGLE_SECRET,
				accessToken: GOOGLE_REFRESHTOKEN,
			},
		});

		const mailOptions = {
			from: "no-reply✉️  <d1churchnetwork@gmail.com>",
			to: email,
			subject: "Password Reset Request",
			html: ` <h3>
            This mail, is for account verification... Please use the <a
            href="${url}/api/member/change/${user}/${value}"
            >Link to Finish</a> up your account creation 
        </h3>`,
		};

		const result = transporter.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
};

module.exports = {
	resetMemberPassword,
	verifiedSignMember,
	verifiedMember,
	resetUserPassword,
	verifiedUser,
	verifiedSignUser,
};
