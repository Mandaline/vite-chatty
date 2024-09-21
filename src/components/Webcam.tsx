import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface WebcamCaptureProps {
  setWebcamActive: (active: boolean) => void;
  screenshot: string | null;
  setScreenshot: (screenshot: string | null) => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  setWebcamActive,
  screenshot,
  setScreenshot
}) => {
  const webcamRef = useRef<Webcam>(null);
  
  const [isAccepted, setIsAccepted] = useState(false);

  const captureScreenshot = () => {
    setIsAccepted(true)
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setScreenshot(imageSrc);
    }
  };

  return (
    <div className="modal">
      <div className="modal__inner-wrap">
        {!isAccepted &&
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={400}
            />
            <div className="webcam__buttons">
              <button onClick={captureScreenshot} className="capture">Capture</button>
              <button onClick={()=> setWebcamActive(false)} className="close">Close</button>
            </div>
          </>
        }
      

        {screenshot && isAccepted && (
          <div>
            <img src={screenshot} alt="Captured screenshot" />
            <div className="webcam__buttons">
              <button onClick={()=> setWebcamActive(false)} className="capture">Accept?</button>
              <button onClick={() => setIsAccepted(false)} className="close">No!</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
