interface ICreateUserDTO {
	name: string,
	password: string,
	email: string,
	id?: string;
	avatar_url?: string
}
export { ICreateUserDTO };
