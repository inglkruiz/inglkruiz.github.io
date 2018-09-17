import React from 'react'

import styles from './styles.module.scss'

const JobHeading = ({ company, period }) => {
  return (
    <h4 className={[styles.jobHeading, 'clearfix'].join(' ')}>
      <strong>{company}</strong>
      <span className='float-right text-muted'>
        {period}
      </span>
    </h4>
  )
}

const JobBody = ({ title, tasks, period = '' }) => {
  return (
    <div>
      <h5 className={[styles.jobPosition, 'clearfix'].join(' ')}>
        {title}
        <span className='float-right text-muted'>
          {period}
        </span>
      </h5>
      <ul>
        {
          tasks.map((text, i) => (<li key={`task_${i}`}>{text}</li>))
        }
      </ul>
    </div>
  )
}

const Section = ({ children }) => {
  return (
    <h3 className={[styles.sectionHeading, 'text-center'].join(' ')}>
      {children}
    </h3>
  )
}

const ExternalLink = (props) => {
  return (
    <a {...props} className='btn btn-link' target='_blank' />
  )
}

const LeadTitle = () => {
  return (
    <h2 className={[styles.resumeLead, 'text-center mb-3'].join(' ')}>
      <small className='text-muted'>
        <em>
          Proactive and disciplined Senior Frontend Web Developer with rock-solid programming skills in JavaScript and latest web technologies. <br /><a href='https://www.google.com.gt/search?q=lifelong+learning'>Lifelong learner</a>
        </em>
      </small>
    </h2>
  )
}

const About = () => (
  <div>
    <LeadTitle />
    <Section>
      SUMMARY OF QUALIFICATIONS
    </Section>
    <ul>
      {
        [
          '9 years of experience in all stages of Web and software development lifecycle. Since 2009 before got my Bachelors degree.',
          'Very familiar with Back End or/and Middleware development as well as understanding the Web global architecture. DevOps CI/CD.',
          'Professional attitude oriented to a self learning process of new methods and technologies for software development.',
          'Truly passionate about User Experience. Focused on deliver value to the user without risking business goals.',
          'Goal-oriented with great talent to fit well in interdisciplinary development teams.'
        ].map((text, i) => (<li key={`skill_${i}`}>{text}</li>))
      }
    </ul>
    <Section>
      TECHNICAL SKILLS
    </Section>
    <p>
      <strong>Languages:</strong> JavaScript(ES6), HTML5, CSS3, SCSS, Markdown, NodeJS, Java(EE6).
    </p>
    <strong>Frontend Web:</strong>
    <ul>
      {
        [
          { topic: 'Libraries', text: 'jQuery(v3), ReactJS(v15|v16), React Router, Flux, Redux, MobX(v3,v4), MobX State Tree(v3), Recompose, RxJS, Jest, Jasmine, Karma.' },
          { topic: 'Frameworks', text: 'Angular(v1.6), Bootstrap(v3|v4), Foundation(v5|v6).' },
          { topic: 'Tools', text: 'Webpack(v3,v4), Gulp, Grunt, Babel, ESlint, Standard, Chrome DevTools, Browserify.' }
        ].map((item, i) => (<li key={`frontend_skill_${i}`}><strong>{item.topic}:</strong> {item.text}</li>))
      }
    </ul>
    <p>
      <strong>Database:</strong> MySQL, Oracle(9i|10g|12g), MSSQL(2005 - 2012).
    </p>
    <p>
      <strong>Others:</strong> Git, Docker, ExpressJS, Gatsby, HapiJs.
    </p>
    <Section>
      PROFESSIONAL EXPERIENCE
    </Section>
    <JobHeading company='HealthCare.com' period='Aug 2015 - Present' />
    <JobBody title='Sr. Frontend Web Developer'
      tasks={[
        'Build Web responsive user  interfaces. Manage breakpoints according Google Analytics statistics. Develop ready-to-use ads widgets.',
        'Integrate web libraries and frameworks. Code user interactions, business tracking events, forms validations and requests to Backend Endpoints.',
        'Handle a fluent and tidy communication with Backend development team, Web designers and QA team.',
        'Co-Lead Frontend development build pipelines and production optimization scripts for deployment using Webpack (v3|v4). Code splitting, Lazy loading and Caching.',
        'Perform code reviews and develop technical documentation.',
        'Support CRO team in the implementation of winner A/B experiments which improve conversion and user experience.',
        'Research current industry trends, and assist with development and promotion of coding best practices within team and industry.'
      ]}
    />

    <JobHeading company='Pensemos S.A.' period='Nov 2012 - Jul 2015' />
    <JobBody title='Lead Frontend Web Developer'
      period='Mar 2015 - Jul 2015'
      tasks={[
        'Study, set, teach and supervise accomplishment of front end standards.',
        'Build Web responsive user  interfaces using Foundation v5 Framework.',
        'Code user interactions and forms validations using AngularJS and jQuery.',
        'Code front-end unit tests using Karma + Jasmine.',
        'Optimize production deployment using Grunt|Gulp + Plugins.',
        'Perform code reviews and develop technical documentation.'
      ]}
    />
    <JobBody title='Fullstack Software Developer'
      period='Nov 2012 - Mar 2015'
      tasks={[
        'Design and develop new functionalities, execute maintenance jobs on a software product which helps companies to design and develop business strategy.',
        'Use software development technologies: J2EE, Hibernate 3.6, Oracle 12g and MS SQL 2008 - 2012, iReport 4, SVN, Jenkins. Deployment on Apache Tomcat 6 || OC4J || Weblogic.',
        'Start and lead an End2End Test suite using Java 1.6, Selenium WebDriver, TestNG, Ant and Jenkins.',
        'Take leadership on updating from CI Hudson Server to Jenkins.',
        'Reduce training time frame for new developers from 3 months to 3 weeks.',
        'Work with SO Ubuntu and Eclipse IDE.'
      ]}
    />
    <Section>
      EDUCATION
    </Section>
    <ul>
      <li>
        <strong>Universidad Industrial de Santander</strong><br />
        Systems and Computer Science Engineer. GPA: 4.07 out of 5.
      </li>
      <li>
        <strong>Universidad Autónoma de Bucaramanga</strong><br />
        MSc in Management and Software Development. (Pensum|Thesis accomplished).
      </li>
    </ul>
    <Section>
      CERTIFICATIONS
    </Section>
    <ul>
      <li>
        <strong>Scrum Agile Institute</strong><br />
        Scrum Developer (License 134423-58)
      </li>
    </ul>
    <h4>Interested? Want to know more?</h4>
    <ExternalLink href='https://github.com/inglkruiz'>
      GitHub
    </ExternalLink>
    <ExternalLink href='https://www.linkedin.com/in/inglkruiz/'>
      LinkedIn
    </ExternalLink>
    <ExternalLink href='https://www.instagram.com/inglkruiz/'>
      Instagram
    </ExternalLink>
  </div>
)

export default About
