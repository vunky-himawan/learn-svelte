import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		title: 'Login Yukkk',
		description: 'Login to your account',
		keywords: 'login, authentication, sign in',
		params
	};
};
