const Sidebar = () => {
  return (
    <aside className="sidebar sidebar-bg border-end p-3 ">
      <h6 className="text-muted fs-3">Resources</h6>
      <ul className="list-unstyled mt-3">
        <li>
          <a
            href="https://dailymed.nlm.nih.gov/"
            target="_blank"
            rel="noreferrer"
          >
            DailyMed
          </a>
        </li>
        <li>
          <a
            href="https://www.accessdata.fda.gov/scripts/cder/daf/"
            target="_blank"
            rel="noreferrer"
          >
            FDA Drug Database
          </a>
        </li>
        <li>
          <a href="https://go.drugbank.com/" target="_blank" rel="noreferrer">
            DrugBank
          </a>
        </li>
        <li>
          <a
            href="https://www.medscape.com/druginfo"
            target="_blank"
            rel="noreferrer"
          >
            Medscape Drug Info
          </a>
        </li>
        <li>
          <a href="https://www.whocc.no/atc/" target="_blank">
            WHO ATC Classification
          </a>
        </li>
        <li>
          <a
            href="https://www.ncbi.nlm.nih.gov/books/NBK547964/"
            target="_blank"
          >
            Pharmacology Overview (NCBI)
          </a>
        </li>
        <li>
          <a href="https://www.lexicomp.com/" target="_blank">
            Lexicomp
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

// <div className="sidebar">
//   <h5>Resources</h5>
//   <ul>
//     <li>
//       <a href="https://www.fda.gov/drugs" target="_blank">
//         FDA: Drugs
//       </a>
//     </li>
//   </ul>
// </div>;
