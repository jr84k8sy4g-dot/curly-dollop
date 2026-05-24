# Coding Standards

name: coding-standards
description: Strictly follow the coding patterns used in the codebase such as creating a menu, creating a new page, a new feature, re-usable components and more.

## NAVIGATION MENUS

- Define new menu under ./lib/menus.ts

## TYPINGS

### FEATURE TYPINGS

- typings should be in a separate file under the feature directory
- naming conventions: {feature name}-types.ts

### RE-USABLE COMPONENT TYPINGS

- Place them under /components/ui/types
- naming conventions: {component name}-{type name}.ts

## RE-USABLE COMPONENTS

- Place re-usable components inside the components/ui
- Always create a re-usable component each time you encounter a new one

## API CONSUMPTION

- to consume the api, the endpoint should not start at /api since this endpoint is already define in .env variable instead use the {feature name} define in the SAMPLE APIs.md file

## FORM COMPONENTS

- In the given api sample payload, if one of the field is UUID, implement it as dropdown and remote search, use the shadcn component. The label name should be the name of the field without the UUID suffix.
- if the given field uuid is multiple, the dropdown component should accept multiple selection and search remote.
