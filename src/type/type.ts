export type DiscordAuthor = {
    username: string;
    public_flags: number;
    premium_type: number;
    id: string;
    global_name: string;
    descriminator: string;
    avatae: string;
};

export type DiscordMember = {
    roles: string[];
    premium_since: null | Date;
    pending: boolean;
    nick: string;
    mute: boolean;
    joined_at: Date;
    flags: number;
    deaf: boolean;
    communication_disabled_until: Date;
    avatar: null | string;
};


export type DiscordResp = {
    type: number;
    flags: number;
    tts: boolean;
    pinned: boolean;
    mention_everyone: boolean;
    timestamp: Date;
    referenced_message: null | string;
    nonce: string;
    mentions: string[];
    mention_roles: string[];
    id: string;
    content: string;
    channel_id: string;
    guild_id: string;
    author: DiscordAuthor;
    member: DiscordMember;
  };


  export type DiscordPayload = {
    op: number;
    d: {
      token: string;
      large_threshold: number;
      properties: {
        [key: string]: any;
      }
    }
  };







// Assert the type of process.env
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        USER_TOKEN: string;
      }
    }
}