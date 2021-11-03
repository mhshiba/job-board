const endpointURL = 'http://localhost:9000/graphql';

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors.map((error) => error.message).join('\n');
    throw new Error(message);
  }
  return responseBody.data;
}
export async function loadJob(id) {
  const query = `query JobQuery($id: ID!) {
        job(id: $id) {
          id
          title
          company {
            id
            name
          }
          description
        }
      }`;

  const variables = {
    id
  };

  const {job} = await graphqlRequest(query, variables);
  return job;
}

export async function loadJobs() {
  const query = `{
        jobs {
          id
          title
          company {
            id
            name
          }
        }
      }`;
  const {jobs} = await graphqlRequest(query);
  return jobs;
}

export async function createJob(input) {
  const mutation = `mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input)
    {
      id
      title
      company {
        name
      }
    }
  }`;
  const {job} = await graphqlRequest(mutation, {input});
  return job;

}

export async function loadCompany(id) {
  const query = `query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }`;
  const variables = {id};
  const {company} = await graphqlRequest(query, variables);
  return company;
}
