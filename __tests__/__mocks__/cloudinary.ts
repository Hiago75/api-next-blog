export const v2 = {
  config: () => {},
  uploader: {
    upload: () => {
      return {
        original_filename: 'fakeName',
        secure_url: 'fakeurl.com',
        public_id: 'fakeId',
        width: 1920,
        height: 1080,
        eager: [
          {
            original_filename: 'fakeName',
            secure_url: 'fakeurl.com',
            public_id: 'fakeId',
            width: 1280,
            height: 720,
          },
          {
            original_filename: 'fakeName',
            secure_url: 'fakeurl.com',
            public_id: 'fakeId',
            width: 1000,
            height: 720,
          },
          {
            original_filename: 'fakeName',
            secure_url: 'fakeurl.com',
            public_id: 'fakeId',
            width: 750,
            height: 720,
          },
          {
            original_filename: 'fakeName',
            secure_url: 'fakeurl.com',
            public_id: 'fakeId',
            width: 500,
            height: 720,
          },
        ],
      };
    },
  },
};
