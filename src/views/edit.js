/* globals UI */

var C = UI.Views.Connector;

class EditForm extends C.View {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    if (!props.connector) {
      this.state.mode = 'connect';
    }
  }
  componentDidMount() {
    this.props.updateField({
      target: {
        name: 'authType',
        value: 'private',
        type: 'select'
      }
    });
  }
  render() {
    return (
      <C.Page default="setup" {...this.props}>
        <C.Panel name="Setup" slug="setup">
          <C.Column type="notes">
            <h1>Adding a Workflow Max Connector</h1>
            <ol>
              <li>Contact Workflow Max <a href="http://www.workflowmax.com/contact-us">http://www.workflowmax.com/contact-us</a> to obtain the API Key and the Account Key.</li>
              <li>Copy both <strong>'API Key'</strong> and <strong>'Account Key'</strong> into the boxes on this page.</li>
              <li>Click <strong>'Save and Verify'</strong>.</li>
              <li>If you receive a domain error from Workflow Max then change the <strong>'Domain'</strong> field.</li>
            </ol>
          </C.Column>
          <C.Column>
            <form onChange={(evt) => {
              this.props.updateField(evt);
            }} onSubmit={(evt) => {
              this.props.updateSettings(evt);
            }}>
              <UI.FormElements.Input inactive={!!(this.props.connectorInstance)} placeholder="Key" name="key" label="Key" type="text" value={this.props._key}/>
              <UI.FormElements.SelectList label="Conncetion Type" name="authType" value={this.props.settings.authType} options={[{label: 'Private (Just for you)', value: 'Private'}, {label: 'Public (for your users)', value: 'Public'}]} />
              <UI.FormElements.Input placeholder="API Key" name="apiKey" label="API Key" type="text" value={this.props.settings.apiKey}/>
              <UI.FormElements.Input placeholder="Account Key" name="accountKey" label="Account Key" type="text" value={this.props.settings.accountKey}/>
              <UI.FormElements.Input placeholder="Domain" name="domain" label="Domain" type="text" value={this.props.settings.domain}/>
              <UI.FormElements.Button
                loading={this.props.saving}
                text={this.props.connectorInstance ? 'Save' : 'Create'}
                type="large"
                submit={true}
                onClick={this.props.updateSettings} />
            </form>
          </C.Column>
        </C.Panel>
      </C.Page>
    );
  }
}

export default EditForm;
global.EditForm = EditForm;
