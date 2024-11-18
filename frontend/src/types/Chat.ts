export interface ChatSlice {
  selectedChatType: string | undefined;
  selectedChatData: Record<string, any> | undefined;
  selectedChatMessages: Record<string, any>[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: Record<string, any> | undefined) => void;
  setSelectedChatMessages: (selectedChatMessages: Record<string, any>[]) => void;
  closeChat: () => void;
}