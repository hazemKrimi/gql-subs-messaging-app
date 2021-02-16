import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Upload: any;
};

export type MutationRoot = {
	__typename?: 'MutationRoot';
	sendMsg: Scalars['ID'];
};

export type MutationRootSendMsgArgs = {
	username: Scalars['String'];
	msg?: Maybe<Scalars['String']>;
	file?: Maybe<Scalars['Upload']>;
};

export enum MutationType {
	Created = 'CREATED',
	Deleted = 'DELETED'
}

export type QueryRoot = {
	__typename?: 'QueryRoot';
	messages: Array<UserObject>;
};

export type StreamChanged = {
	__typename?: 'StreamChanged';
	mutationType: MutationType;
	id: Scalars['ID'];
	user?: Maybe<UserObject>;
};

export type SubscriptionRoot = {
	__typename?: 'SubscriptionRoot';
	subscribe: StreamChanged;
};

export type SubscriptionRootSubscribeArgs = {
	mutationType?: Maybe<MutationType>;
};

export type UserObject = {
	__typename?: 'UserObject';
	id: Scalars['String'];
	username: Scalars['String'];
	text: Scalars['String'];
	src: Scalars['String'];
};

export const ADD_MESSAGE = gql`
	mutation($msg: String!, $file: Upload, $username: String!) {
		sendMsg(msg: $msg, file: $file, username: $username)
	}
`;

export const SUBSCRIBE_TO_MESSAGES = gql`
	subscription {
		subscribe {
			id
			user {
				id
				username
				text
				src
			}
		}
	}
`;

export const GET_MESSAGES = gql`
	query {
		messages {
			id
			username
			text
			src
		}
	}
`;
