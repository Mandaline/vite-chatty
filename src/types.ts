
export interface ProductData {
  id: number;
  title: string;
  user_description: string;
  optimized_description: string;
  image_url: string;
  keywords: string;
}

export interface FaceShape {
  shapeType: string;
  shapeDef: string;
  image: string;
}

export interface Message {
  sender: "user" | "bot";
  text: string | JSX.Element;
}

interface FetchAPIResult {
  message: string;
  screenshot: string | null;
  products: ProductData[];
}

export interface CustomChatProps {
  fetchAPI: (
    messageText: string,
    screenshot: string | null,
    selectedFaceShape: string | null
  ) => Promise<FetchAPIResult>;
  setProducts: (product: any) => void;
  screenshot: string | null;
  setWebcamActive: (active: boolean) => void;
  selectedFaceShape: string | null;
}