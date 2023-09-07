import React from "react";

type ResultRowProps = {
  loading?: boolean;
  providerName?: string;
  btc?: string;
};

type Logo = {
  source: string,
  invert?: boolean,
}

const logos:{[keys:string]:Logo} = {
  okx: {source:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAABICAQAAADSOpYzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAHdElNRQfmBwMNKhI4Vg/yAAABMklEQVR42u3aQW6DMBBAUZyT5eSFE/RInS5psOKx8Scq0n9ZNXjA+VE3VpZFkiRJkiShYo0rrYPPWyf3+3VYXZL138nTuudLxLVfVCmHrcXY+uqjteejPF7/XH5G1teXe+ebt1E/Q0IMCTEkxJAQQ0IMCTEkxJAQQ0IMCTEkxJCQ+4XcBq+Orj87n54oPlv3iWc2Xk3A55tzZs8rd+l55OT54PB5ZLrhMjd/2M3keeXufv/a/5QhIYaEGBJiSIghIYaEGBJiSIghIYaEGBJiSEgaMjtG+/B+tw/f8eVqlPq1X7xYlX5wfTXfPj/095Hv1tdfRPLJ/X3kvRkSYkiIISGGhBgSYkiIISGGhBgSYkiIISGGhDwuOOH7a+t4p//qmflticYrf946OS9JkiRJkk75BUgSur6QrNyYAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA3LTAzVDEzOjQyOjE4KzAwOjAwKpbwNQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wNy0wM1QxMzo0MjoxOCswMDowMFvLSIkAAAAASUVORK5CYII='},
  binance:{source:'https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg'},
  moonpay:{source:'https://www.moonpay.com/assets/logo-full-white.svg'},
  guardarian:{source:'https://guardarian.com/main-logo.svg'},
}

const ResultRow = (props: ResultRowProps) => {
  return (
    <a
      href={`https://www.${props.providerName}.com`}
      target="_blank"
      className="border block border-white/10 relative min-h-[64px]
                rounded-lg bg-gradient-to-r from-purple-500/10
                 to-blue-500/10 p-4 my-2 overflow-hidden"
    >
      <div className="flex gap-4">
        {props.providerName && (
          <div className="grow items-center flex">
            <img 
              src={logos[props.providerName].source}
              className="h-8" alt="" />
          </div>
        )}
          {props.btc && (
          <div className="flex gap-2">
          <span className="text-xl text-purple-200/80">
            {new Intl.NumberFormat('de-DE', {minimumFractionDigits:8}).format(parseFloat(props.btc))}
            </span>
          <span className="text-xl text-purple-300/50">BTC</span>
        </div>
        )}
        
      </div>

      {props.loading && (
        <div
          className="inset-0 absolute bg-gradient-to-r skeleton-animation
          from-transparent via-blue-900/50  to-transparent border-t border-white/25"
        />
      )}
    </a>
  );
};

export default ResultRow;
