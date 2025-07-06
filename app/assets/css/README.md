# Styling

This document describes how styling is handled in this application.

## Tailwind CSS

[**Tailwind CSS**](https://tailwindcss.com) is primarily used for styling components in this project.  
Unlike other frameworks (such as Bootstrap), Tailwind offers great flexibility for custom and individual styling.  
It is used here to broaden expertise in modern, utility-first CSS approaches and to enable highly customized designs.

## CSS

Some additional styling adjustments are made using plain CSS, especially for animations and effects that are not easily achievable with Tailwind alone.  
However, the use of custom CSS is kept to a minimum, as Tailwind covers most styling needs.  
A CSS preprocessor like SCSS is intentionally not used in this project.

## File Structure

The folder structure in `assets/css` mirrors the structure of the `app` directory.  
This means that each component has its own corresponding CSS file, which is imported into `main.css`.  
This approach keeps styles modular and organized, making it easy to maintain and scale the application's design.