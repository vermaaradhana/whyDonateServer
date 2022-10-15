const whitelist: Array<string> = [
    `https://www.mywhitelistedoriginfromwhereicancallthisapi.com`
  ];
  
  export const corsOption: any = {
    origin: function (origin: string, callback: any) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by cors'));
      }
    }
  };
  