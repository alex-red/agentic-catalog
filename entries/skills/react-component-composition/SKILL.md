---
name: react-component-composition
description: Design or refactor React component APIs when interacting mode flags, duplicated state, or tangled ownership make changes difficult. Use for compound components, controlled interfaces, context boundaries, and behavior-preserving component extraction.
license: MIT
---

# React component composition

Improve the boundary that makes the requested change hard. Inspect the installed React version, client/server boundaries, existing component library, and current callers before choosing a pattern. Preserve behavior and project conventions; do not convert a small cohesive component into a framework.

## Find the actual contract

Read representative callers and identify valid states, state ownership, events, refs, and required accessibility behavior. A boolean such as `disabled` is a useful contract; several interacting mode flags may encode invalid combinations. Choose explicit variants or a discriminated union when modes have different requirements. Avoid replacing useful typed props with an unstructured options bag.

Use children or named content props when callers supply structure. Use render callbacks when the component supplies data or behavior to the caller. Compound components can make independently arranged parts clearer, but do not require them for a fixed layout.

## Put state with its owner

- Keep local state local when only one responsibility needs it. When siblings must coordinate, use their nearest useful common owner. Avoid copying props into state and synchronizing two owners through effects.
- For a controlled contract, the caller owns the value and receives change notifications. For an uncontrolled contract, the component owns it and initial/default props initialize it. Preserve the existing contract, including reset semantics; do not silently switch ownership during a refactor.
- Prefer direct props for a short dependency path. Context is useful when many nested parts need one scoped capability. Two independently mounted widgets should normally have two provider instances, not one global mutable singleton.
- A context default must reflect reality. If a provider is required, use a nullable context and a consuming hook that throws a useful error before destructuring. Do not use a type assertion to hide a missing provider. If no provider is valid, define an intentional fallback instead.
- Keep request/user state out of shared server module variables. Client context does not provide server authorization or make arbitrary Server Components consume client state.

## Respect React versions and identity

`useContext` remains valid in React 19. React 19's `use(Context)`, provider shorthand and ref-as-prop are version-dependent options, not reasons to rewrite React 18 code. Keep supported ref APIs for the package's declared compatibility range.

Extract component definitions at module scope. Preserve types, tree position and keys where state should survive; change keys only where resetting state is intended. Moving providers or conditional branches can reset drafts, focus and subscriptions even when the visible JSX looks equivalent.

Context providers compare values by identity. Splitting unrelated subscriptions or stabilizing values can help a measured expensive path, but do not promise that compound components or context automatically improve performance. Follow the project's React Compiler setup; avoid blanket memoization.

## Preserve interaction while changing structure

Trace the existing event, ref and attribute paths through the proposed boundary. Preserve event ordering, form submission, native element semantics, accessible names, keyboard behavior and focus restoration where applicable. Do not introduce a new handler that prevents a caller's handler from running or silently drops a ref. Keep established accessible primitives rather than rebuilding their behavior for an API aesthetic.

After changing the boundary, check the cases that could actually regress: two independent instances, controlled updates from the parent, the intended reset/preservation behavior, and actions from each supported variant. Test a missing provider if that is a public misuse case. Use interaction tests for keyboard/focus behavior and profiling for performance claims; snapshots or a smaller prop count do not establish success.

## Contracts

- [State ownership and controlled components](https://react.dev/learn/sharing-state-between-components)
- [Context defaults and provider versions](https://react.dev/reference/react/createContext)
- [Context subscriptions and value identity](https://react.dev/reference/react/useContext)
- [Preserving and resetting state](https://react.dev/learn/preserving-and-resetting-state)
