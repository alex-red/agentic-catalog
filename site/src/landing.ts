interface LandingOptions {
  entryCount: number;
  collectionCount: number;
  copyAction: HTMLButtonElement;
  search: (query: string) => void;
  openCommands: () => void;
}

/** An orientation page for browsing, comparing and deliberately adopting guidance. */
export function createLandingPage(options: LandingOptions): HTMLElement {
  const page = document.createElement('article');
  page.className = 'catalog-landing';
  page.setAttribute('aria-labelledby', 'landing-title');
  page.innerHTML = `
    <header class="landing-hero">
      <p class="landing-eyebrow">A field guide for your coding agent</p>
      <h2 id="landing-title">Find the right guidance <br>for the job.</h2>
      <p class="landing-lead">Agentic Catalog is a curated library of skills, rules, workflows and development tools for Claude Code, Codex and portable agent setups. Find a method that fits your project, understand its tradeoffs, then choose what to adopt.</p>
      <p class="landing-inventory"></p>
      <div class="landing-actions">
        <a class="btn-source" href="#/collection/starter">Explore the starter set <span aria-hidden="true">→</span></a>
      </div>
      <p class="landing-caption">Start with a few useful entries, or paste the copied prompt into your agent for a project-specific shortlist.</p>
    </header>

    <section aria-labelledby="landing-how">
      <h3 id="landing-how" class="landing-section-title">From a task to a useful addition</h3>
      <ol class="landing-steps">
        <li>
          <div class="landing-step-label"><span aria-hidden="true">01</span><h4>Find</h4></div>
          <div>
            <p>Search for the problem you want to solve: debugging a flaky test, improving an interface, or reviewing a commit. Short terms work best in the top search, which matches text in titles, summaries, use cases, IDs and tags.</p>
            <div class="landing-searches" role="group" aria-label="Start a fresh example search"></div>
            <p class="landing-caption">Examples start a fresh search and clear active filters.</p>
            <p>Choose a host to include compatible and portable entries. Use Filter to narrow by category, type or source, and remove filter chips to broaden the list. For a search across the entire catalog regardless of filters, open <button class="landing-inline-button" type="button" data-commands>Commands</button> with <kbd>⌘ / Ctrl K</kbd>.</p>
          </div>
        </li>
        <li>
          <div class="landing-step-label"><span aria-hidden="true">02</span><h4>Compare</h4></div>
          <div>
            <p>Open an entry and read <strong>When to use</strong>, reviewer notes and <strong>Built-in overlap</strong>. Check whether your agent already covers the job, then compare related guidance. Collections offer a starting shortlist; you can choose individual members.</p>
            <p>A score is a curator judgment about usefulness, quality, portability and novelty—not a measured guarantee. Check the evidence and its scope. Experimental entries are options to investigate, with limitations recorded in their notes.</p>
          </div>
        </li>
        <li>
          <div class="landing-step-label"><span aria-hidden="true">03</span><h4>Use</h4></div>
          <div>
            <p>Use an entry’s <strong>Copy for LLM</strong> action to hand installation guidance to your coding agent, or read its installation instructions and source files. For several entries, tick their checkboxes and choose <strong>Install…</strong> to review the selection and generate a script or config.</p>
            <p>Keep the project’s existing conventions, include required resources and licenses, and inspect generated commands before running them. Workflows are procedures to follow; tools, hooks, MCP servers and plugins can require separate setup. Browsing or copying an entry does not install or activate it.</p>
          </div>
        </li>
      </ol>
    </section>

    <div class="landing-reference">
      <section aria-labelledby="landing-evidence">
        <h3 id="landing-evidence" class="landing-section-title">Read the evidence</h3>
        <dl class="landing-evidence">
          <div><dt>Reviewed</dt><dd>Read and assessed by a curator.</dd></div>
          <div><dt>Used</dt><dd>Observed in an actual session.</dd></div>
          <div><dt>Tested</dt><dd>Recorded trigger tests.</dd></div>
          <div><dt>Evaluated</dt><dd>Recorded outcome evaluation.</dd></div>
        </dl>
        <p class="landing-caption">Follow the linked evidence and review notes for what was actually checked.</p>
      </section>
      <section aria-labelledby="landing-shortcuts">
        <h3 id="landing-shortcuts" class="landing-section-title">Keep exploring</h3>
        <ul class="landing-links">
          <li><a href="#/collection/debugging">Debugging collection <span aria-hidden="true">↗</span></a></li>
          <li><a href="#/collection/frontend-quality">Frontend quality collection <span aria-hidden="true">↗</span></a></li>
          <li><a href="https://github.com/alex-red/agentic-catalog" target="_blank" rel="noreferrer">Project on GitHub <span aria-hidden="true">↗</span></a></li>
        </ul>
        <p class="landing-caption"><kbd>/</kbd> focuses search. Click the catalog name to return here. Agents can read the repository’s <a href="https://raw.githubusercontent.com/alex-red/agentic-catalog/main/llms.txt" target="_blank" rel="noreferrer">llms.txt index</a> directly.</p>
      </section>
    </div>`;

  page.querySelector('.landing-inventory')!.textContent = `${options.entryCount} entries · ${options.collectionCount} collections · Source and license recorded`;
  options.copyAction.title = 'Copy a prompt to ask your agent for a project-specific shortlist';
  page.querySelector('.landing-actions')!.append(options.copyAction);
  const examples = page.querySelector('.landing-searches')!;
  for (const query of ['debugging', 'frontend', 'commit', 'game-design']) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'landing-search';
    button.textContent = query;
    button.setAttribute('aria-label', `Search catalog for ${query}`);
    button.addEventListener('click', () => options.search(query));
    examples.append(button);
  }
  page.querySelector('[data-commands]')!.addEventListener('click', options.openCommands);
  return page;
}
