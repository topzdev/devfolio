import Container from "~/components/layout/Container";
import Typography from "~/components/ui/typography";
import {Card, CardContent} from "~/components/ui/card";
import PortfolioSubmitForm from "~/app/submit/_components/PortfolioSubmitForm";

type Props = {};
const Page = (props: Props) => {
  return (
    <Container className={"grid grid-cols-2 py-20"}>
      <div className={"w-[550px]"}>
        <Typography variant={"h1"} className={"mb-4"}>
          Submit Portfolio
        </Typography>
        <Typography variant={"p"}>
          Submit your website or give a nod to a fellow developer’s site. If we
          feature it in our gallery. we’ll drop you a email.
        </Typography>

        <Typography className={'mt-20 mb-5'} variant={"h4"}>Submission Guidelines</Typography>
          <ul className={'prose prose-ul list-disc pl-4'}>
              <li>
                  <b>No Submission Fees:</b> Devfolio does not charge for submissions. We aim to showcase top websites
                  and help developers find inspiration and employer to find their prospect employee.
              </li>
              <li>
                  <b>Open to Everyone:</b> Anyone can submit, but not all submissions are accepted. Devfolio is curated,
                  so only select websites are featured.
              </li>
              <li>
                  <b>Authorship:</b> You can submit your own or other inspiring developer portfolio you found.
              </li>
              <li>
                  <b>Review Time:</b> Reviews take a few days to a month, depending on the submission queue.
              </li>
              <li>
                  <b>Review Criteria:</b> We assess design trends, aesthetics, usability, accessibility, and content.
              </li>

              <li>
                  <b>Notification:</b> If featured, you'll be notified via email. If you don't hear back within a month, your submission wasn't selected.
              </li>
          </ul>
      </div>
        <div>
           <PortfolioSubmitForm/>
        </div>
    </Container>
  );
};
export default Page;
