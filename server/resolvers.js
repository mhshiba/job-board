const db = require('./db');

const Query = {
    // The first parameter is always the parent object
    // In this case, it's the root (query)
    // The second parameters is args, which contais values sent by the client
    // In this case, there is a parameter id
    // job: (root, args) => db.jobs.get(args.id),
    job: (root, {id}) => db.jobs.get(id), // This line means the same as above, but use deconstruct to get arg
    jobs: () => db.jobs.list(),
    company: (root, {id}) => db.companies.get(id),
};

const Job = {
    // The first parameter is the parent object
    // So, as Company is inside Job, the first argument is Job
    company: (job) => db.companies.get(job.companyId)
}

const Company = {
    jobs: (company) => db.jobs.list().filter((job) => job.companyId === company.id)
}

module.exports = { Query, Job, Company };
