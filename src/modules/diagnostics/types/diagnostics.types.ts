export type ResultViewProps = {
  photoUri?: {
    uri: string;
    type?: string;
    fileName?: string;
  };
  diagnostic: any;
  onReset: () => void;
  onNewDiagnostic: () => void;
};

export interface TreatmentCardProps {
  title: string;
  image?: string;
  link?: string;
}
