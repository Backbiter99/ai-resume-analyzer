interface FSItem {
    id: string;
    uid: string;
    name: string;
    path: string;
    is_dir: boolean;
    parent_id: string;
    parent_uid: string;
    created: number;
    modified: number;
    accessed: number;
    size: number | null;
    writable: boolean;
}

interface PuterUser {
    uuid: string;
    username: string;
}

interface KVItem {
    key: string;
    value: string;
}

interface ChatMessageContent {
    type: "file" | "text";
    puter_path?: string;
    text?: string;
}

interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string | ChatMessageContent[];
}

interface FunctionTool {
    type: "function";
    function: {
        name: string;
        description: string;
        parameters: {
            type: string;
            properties: Record<string, unknown>;
        };
    };
}

interface PuterChatOptions {
    model?: string;
    stream?: boolean;
    max_tokens?: number;
    temperature?: number;
    tools?: FunctionTool[];
}

interface UsageInfo {
    type: string;
    model: string;
    amount: number;
    cost: number;
}

interface MessageResponse {
    role: string;
    content: string | unknown[];
    refusal: string | null;
    annotations: unknown[];
}

interface AIResponse {
    index: number;
    message: MessageResponse;
    logprobs: unknown | null;
    finish_reason: string;
    usage: UsageInfo[];
    via_ai_chat_service: boolean;
}
