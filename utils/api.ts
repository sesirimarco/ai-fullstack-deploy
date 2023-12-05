export const createURL = (path: string) => {
  return window.location.origin + path;
};

export const createEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    }),
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    }),
  );
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: 'POST',
      body: JSON.stringify({ question }),
    }),
  );
  /*  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: 'GET',
    }),
  ); */
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const deleteEntry = async (id: string) => {
  const response = await fetch(createURL(`/api/journal/${id}`), {
    method: 'DELETE',
  });
};
