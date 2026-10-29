# Fieldnote design brief

Produce an implementation-ready layout and interaction specification, without code, for Fieldnote: a browser app used by collection managers and a native desktop companion. Answer in at most 800 words. Work from this brief only; no browsing, product edits, or user studies. Distinguish proposed behavior from verified behavior.

The main workspace has a persistent library of records with title, owner, collection, status, and last-edited time. People compare many records and edit them for hours, usually with a keyboard and pointer. Some also use the browser on a narrow touch device to capture a record quickly. Native desktop windows can be resized. Current product vocabulary and its labeled comparison table are established; retain them where useful.

The brand uses warm neutral surfaces, a restrained coral accent, serif headings, and plain body text. The team wants a polished, approachable experience with a little personality. Existing tokens should remain usable. The current navigation proposal puts Library, Collections, and New record in the same destination strip. Editing opens a detail pane containing title, notes, owner, and collection. Empty libraries and long record titles are possible.

Saving takes approximately five seconds. Network failures can occur after the service has created the record but before the client receives the response. The API contract for reconciling that state has not been settled. Records may also be changed by another collaborator. Managers can permanently remove a collection and all of its records; that operation has no rollback service. Ordinary record archiving is reversible.

Explain the major layout and behavior decisions for both surfaces, how the narrow capture experience works, and which checks the team should perform before shipping. Keep the proposal within scope; do not change the business model or introduce new mandatory services.
