import Image from 'next/image';

export const SSNApp = () => {
  return (
    <div className="container my-10 py-5 pb-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="pb-5 container flex flex-col font-poppins">
            <span className={`font-semibold text-2xl text-slate-900`}>05.</span>
            <span className="text-4xl font-bold text-gray-900">
              Student i Sørøst-Norge?
            </span>
            <p className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal whitespace-pre-line">
              {
                'Last ned appen "Student Sørøst" for å finne alt av arragamenteter, tilbud, leieforhold, snarveier til Canvas, TimeEdit, Min USN, Sikresiden og mye mer annet!\n\nAppen ble nylig lansert i 2021, og er fortsatt under utvikling! Over 90% av alle studentene ved USN har allerede tatt i bruk av appen.'
              }
            </p>
            <div className="flex flex-row mx-4 justify-center">
              <a
                href="https://apps.apple.com/us/app/student-s%C3%B8r%C3%B8st/id1531470703"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={150}
                  height={50}
                  src="https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/apple.png?alt=media&token=8cfa5355-3bee-4cd8-a55e-8f902f782f13"
                  alt="App Store"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=no.ssn.studentsorost&gl=NO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={150}
                  height={50}
                  src="https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/googleplay.png?alt=media&token=55d33494-b487-4e90-8220-3e1239bff309"
                  alt="Google Play"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 container">
          <Image
            width={500}
            height={500}
            alt="Student Sørøst"
            src={
              'https://firebasestorage.googleapis.com/v0/b/fadderukabo.appspot.com/o/studentapp.webp?alt=media&token=1f5fbd2a-bd2b-4a2b-9ac1-07eed585438b'
            }
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  );
};
