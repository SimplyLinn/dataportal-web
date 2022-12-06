import { client } from '../../graphql/client';
import { PUBLICATION_QUERY } from '../../graphql/publicationQuery';
import { Publication, PublicationVariables } from '../../graphql/__generated__/Publication';

const HEALTHCHECK_SECRET = process.env.HEALTHCHECK_SECRET;

/**
 * API for performing health checks, will try to run the startpage query
 *
 * @param {*} req
 * @param {*} res
 * @returns status: "pass" or status: "fail"
 */
export default async function handler(req: any, res: any) {
  // Check for secret to confirm this is a valid request
  if (HEALTHCHECK_SECRET && req.query.secret !== HEALTHCHECK_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    //perform request to start page query
    const result = await client.query<Publication, PublicationVariables>({
      query: PUBLICATION_QUERY,
      variables: {
        filter: { limit: 3 },
      },
      fetchPolicy: 'no-cache',
    });

    if (result && result.error) {
      return res.status(500).json({ status: 'fail' });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ status: 'pass' });
  } catch (err) {
    //TODO: try to log error

    return res.status(500).json({ status: 'fail' });
  }
}
