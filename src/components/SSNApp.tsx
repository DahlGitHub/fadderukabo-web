import Image from 'next/image';
import Link from 'next/link';

export const SSNApp = () => {
  return (
    <div className="container my-10 py-5 pb-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="pb-5 container flex flex-col font-poppins">
            <span className={`font-semibold text-2xl text-slate-900`}>06.</span>
            <span className="text-4xl font-bold text-gray-900">
              Student i Sørøst-Norge?
            </span>
            <p className="py-5 text-gray-800 tracking-wide leading-6.5 break-normal whitespace-pre-line">
              {
                'Last ned appen "Student Sørøst" for å finne alt av arragamenteter, tilbud, leieforhold, snarveier til Canvas, TimeEdit, Min USN, Sikresiden og mye mer annet!\n\nAppen ble nylig lansert i 2021, og er fortsatt under utvikling! Over 90% av alle studentene ved USN har allerede tatt i bruk av appen.'
              }
            </p>
            <div className="flex flex-row mx-4 justify-center">
              <Link
                href="https://apps.apple.com/us/app/student-s%C3%B8r%C3%B8st/id1531470703"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={150}
                  height={50}
                  src="https://firebasestorage.googleapis.com/v0/b/usnfadderuka.firebasestorage.app/o/Images%2FComponent%202.png?alt=media&token=1cd119c7-9142-41b8-92c1-e23e0895e3ad"
                  alt="App Store"
                />
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=no.ssn.studentsorost&gl=NO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={150}
                  height={50}
                  src="https://firebasestorage.googleapis.com/v0/b/usnfadderuka.firebasestorage.app/o/Images%2FComponent%202(1).png?alt=media&token=21f71ec0-d09e-49f5-8c54-def5b14779cd"
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
              'https://firebasestorage.googleapis.com/v0/b/usnfadderuka.firebasestorage.app/o/Images%2Fstudentsorost_august24-9935-2_epmyik.webp?alt=media&token=f46929da-2966-41e3-95d0-249786e318cc'
            }
            className="w-full rounded"
          />
        </div>
      </div>
    </div>
  );
};
