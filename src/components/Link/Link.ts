//language=hbs

export default `
    <a class='link {{#if danger}}danger{{/if}}' href='{{ href }}' page='{{page}}'>{{ text }}</a>
`;
