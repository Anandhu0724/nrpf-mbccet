import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  Sprout,
  TreePine,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Pin the planting location',
    description:
      'Open the TreeTag map, allow location access, and use the current-location control to confirm the planting spot. Tap the plus button to start a new tree record.',
    Icon: MapPin,
  },
  {
    number: '02',
    title: 'Enter verified details',
    description:
      'Select the planted species under “Tree Name” and set the actual “Date of Planting”. Add a short note with the site or campus context and who will care for the sapling.',
    Icon: Sprout,
  },
  {
    number: '03',
    title: 'Add at least three photos',
    description:
      'The form requires a minimum of three images. Use clear, recent photos: the full sapling and base, a useful species detail, and the planting location in context.',
    Icon: TreePine,
  },
  {
    number: '04',
    title: 'Submit for verification',
    description:
      'Review the pin, species, date, notes, and images, then select “Add Tree”. The reference video confirms submission with “Tree submitted for verification”. Keep the entry pending until your NSS unit verifies it.',
    Icon: ClipboardCheck,
  },
]

const fields = [
  {
    name: 'Tree Name',
    detail: 'Choose the species that was actually planted. The video shows Abiu as an example selection; do not copy it unless it is correct.',
  },
  {
    name: 'Date of Planting',
    detail: 'Enter the real planting date, not the date the record is submitted.',
  },
  {
    name: 'Notes',
    detail: 'Keep notes factual and useful for follow-up: site, planting activity, or care plan. Leave out personal contact details.',
  },
  {
    name: 'Photos',
    detail: 'Upload at least three original, legible photos that document the sapling and its location.',
  },
]

export default function TaggingGuidelines() {
  return (
    <section className="tagging-section" id="tagging" aria-labelledby="tagging-title">
      <div className="tagging-heading reveal">
        <div>
          <p className="eyebrow"><span className="eyebrow-dot" /> OFFICIAL TREE TAGGING GUIDE</p>
          <h2 id="tagging-title">A clear record for<br />every <em>tree planted.</em></h2>
          <p>Use the TreeTag map and follow these steps to create a complete record ready for review.</p>
        </div>
        <a className="tagging-platform-link" href="https://treetag.in" target="_blank" rel="noreferrer">
          Open TreeTag <ArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <ol className="tagging-steps">
        {steps.map(({ number, title, description, Icon }) => (
          <li className="tagging-step reveal" key={number}>
            <div className="tagging-step-top"><span>{number}</span><Icon aria-hidden="true" /></div>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>

      <div className="tagging-details">
        <div className="tagging-fields reveal">
          <p className="tagging-label">TREE RECORD FIELDS</p>
          <h3>Check each field before you submit.</h3>
          <dl>
            {fields.map((field) => (
              <div className="tagging-field" key={field.name}>
                <dt>{field.name}</dt>
                <dd>{field.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="tagging-standard reveal" aria-labelledby="tagging-standard-title">
          <div className="standard-icon"><CheckCircle2 aria-hidden="true" /></div>
          <p className="tagging-label">DATA &amp; PRIVACY STANDARD</p>
          <h3 id="tagging-standard-title">Keep every entry official.</h3>
          <ul>
            <li>Use the Institution, Cluster, and College already assigned to your TreeTag profile. Never copy another volunteer&apos;s profile details.</li>
            <li>Share participant photos only with consent and follow your NSS unit&apos;s public-visibility policy.</li>
            <li>Do not mark a tree as verified until its status is confirmed by the responsible unit.</li>
          </ul>
          <p className="tagging-status"><span aria-hidden="true" /> Submission status: awaiting verification</p>
        </aside>
      </div>
    </section>
  )
}
