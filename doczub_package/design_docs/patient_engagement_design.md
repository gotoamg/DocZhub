# Patient Engagement Tools Design

## Overview
This document outlines the design for enhanced patient engagement tools for DocZHub.com, inspired by Tebra's capabilities. These tools will improve patient communication, streamline administrative processes, and increase patient satisfaction and retention.

## 1. Digital Patient Intake System

### Data Model

#### Digital Forms
```
DigitalForm {
  id: UUID
  practice_id: UUID
  name: String
  description: Text
  form_type: Enum (Registration, Medical History, Consent, Custom)
  form_structure: JSON (form fields, validation rules, conditional logic)
  is_required: Boolean
  auto_assign: Boolean
  applicable_appointment_types: UUID[] (optional)
  version: Integer
  created_at: Timestamp
  updated_at: Timestamp
}
```

#### Patient Form Assignments
```
PatientFormAssignment {
  id: UUID
  patient_id: UUID
  form_id: UUID
  appointment_id: UUID (optional)
  status: Enum (Pending, Completed, Expired)
  completion_percentage: Integer
  assigned_date: Timestamp
  due_date: Timestamp
  completed_date: Timestamp (optional)
  reminder_sent: Boolean
  created_at: Timestamp
  updated_at: Timestamp
}
```

#### Form Responses
```
FormResponse {
  id: UUID
  assignment_id: UUID
  patient_id: UUID
  form_id: UUID
  response_data: JSON
  ip_address: String
  user_agent: String
  signature: JSON (optional)
  created_at: Timestamp
  updated_at: Timestamp
}
```

### API Endpoints

#### Digital Forms
- `GET /api/forms` - Get all forms
- `POST /api/forms` - Create form
- `PUT /api/forms/:id` - Update form
- `GET /api/forms/:id` - Get form details
- `GET /api/forms/:id/versions` - Get form versions

#### Patient Form Assignments
- `GET /api/patients/:id/forms` - Get patient's assigned forms
- `POST /api/patients/:id/forms` - Assign form to patient
- `GET /api/appointments/:id/forms` - Get appointment-related forms
- `POST /api/appointments/:id/forms` - Assign forms for appointment

#### Form Responses
- `POST /api/forms/:id/responses` - Submit form response
- `GET /api/forms/:id/responses` - Get form responses
- `GET /api/patients/:id/form-responses` - Get patient's form responses

### Component Architecture

#### Form Builder
- Drag-and-drop interface
- Field type selection
- Validation rules
- Conditional logic
- Form versioning

#### Patient Form Portal
- Form list and status
- Form completion interface
- Save and resume functionality
- Electronic signature capture
- Form submission confirmation

#### Form Management Dashboard
- Form assignment tracking
- Completion status monitoring
- Response review interface
- Form analytics
- Reminder management

## 2. Automated Patient Communication

### Data Model

#### Communication Templates
```
CommunicationTemplate {
  id: UUID
  practice_id: UUID
  name: String
  description: Text
  channel: Enum (Email, SMS, Push, Portal)
  subject: String (for email)
  content: Text
  variables: String[]
  attachment_types: String[] (optional)
  created_at: Timestamp
  updated_at: Timestamp
}
```

#### Communication Campaigns
```
CommunicationCampaign {
  id: UUID
  practice_id: UUID
  name: String
  description: Text
  template_id: UUID
  trigger_type: Enum (Appointment, Birthday, Form, Custom)
  trigger_details: JSON
  status: Enum (Active, Paused, Completed, Draft)
  start_date: Date
  end_date: Date (optional)
  created_at: Timestamp
  updated_at: Timestamp
}
```

#### Patient Communications
```
PatientCommunication {
  id: UUID
  patient_id: UUID
  campaign_id: UUID (optional)
  template_id: UUID
  channel: Enum (Email, SMS, Push, Portal)
  content: Text
  variables_used: JSON
  status: Enum (Scheduled, Sent, Delivered, Failed)
  scheduled_time: Timestamp
  sent_time: Timestamp (optional)
  delivery_status: JSON
  created_at: Timestamp
  updated_at: Timestamp
}
```

### API Endpoints

#### Communication Templates
- `GET /api/communications/templates` - Get all templates
- `POST /api/communications/templates` - Create template
- `PUT /api/communications/templates/:id` - Update template
- `GET /api/communications/templates/:id/preview` - Preview template

#### Communication Campaigns
- `GET /api/communications/campaigns` - Get all campaigns
- `POST /api/communications/campaigns` - Create campaign
- `PUT /api/communications/campaigns/:id` - Update campaign
- `PUT /api/communications/campaigns/:id/status` - Update campaign status
- `GET /api/communications/campaigns/:id/analytics` - Get campaign analytics

#### Patient Communications
- `GET /api/patients/:id/communications` - Get patient communications
- `POST /api/patients/:id/communications` - Send communication to patient
- `GET /api/communications/:id/status` - Check communication status

### Component Architecture

#### Template Builder
- WYSIWYG editor
- Variable insertion
- Channel-specific formatting
- Template testing
- Version control

#### Campaign Manager
- Campaign creation wizard
- Trigger configuration
- Audience selection
- Scheduling options
- A/B testing capabilities

#### Communication Dashboard
- Campaign performance metrics
- Delivery statistics
- Patient engagement tracking
- Opt-out management
- Compliance monitoring

## 3. Appointment Reminders and Notifications

### Data Model

#### Reminder Settings
```
ReminderSetting {
  id: UUID
  practice_id: UUID
  appointment_type_id: UUID (optional)
  reminder_type: Enum (Appointment, Follow-up, Recall)
  channels: String[] (Email, SMS, Push, Portal)
  timing: JSON (days/hours before event)
  is_active: Boolean
  created_at: Timestamp
  updated_at: Timestamp
}
```

#### Appointment Reminders
```
AppointmentReminder {
  id: UUID
  appointment_id: UUID
  patient_id: UUID
  reminder_setting_id: UUID
  channel: Enum (Email, SMS, Push, Portal)
  status: Enum (Scheduled, Sent, Delivered, Failed)
  scheduled_time: Timestamp
  sent_time: Timestamp (optional)
  response: Enum (None, Confirmed, Rescheduled, Cancelled)
  response_time: Timestamp (optional)
  created_at: Timestamp
  updated_at: Timestamp
}
```

#### Patient Notifications
```
PatientNotification {
  id: UUID
  patient_id: UUID
  notification_type: Enum (AppointmentReminder, FormReminder, ResultAvailable, MessageReceived, BillingUpdate)
  reference_id: UUID (appointment_id, form_id, etc.)
  content: Text
  channel: Enum (Email, SMS, Push, Portal)
  status: Enum (Pending, Sent, Delivered, Read, Failed)
  sent_time: Timestamp (optional)
  read_time: Timestamp (optional)
  created_at: Timestamp
  updated_at: Timestamp
}
```

### API Endpoints

#### Reminder Settings
- `GET /api/settings/reminders` - Get reminder settings
- `POST /api/settings/reminders` - Create reminder setting
- `PUT /api/settings/reminders/:id` - Update reminder setting
- `GET /api/settings/reminders/appointment-types/:id` - Get settings for appointment type

#### Appointment Reminders
- `GET /api/appointments/:id/reminders` - Get appointment reminders
- `POST /api/appointments/:id/reminders` - Create manual reminder
- `PUT /api/appointments/:id/reminders/:id/response` - Update reminder response

#### Patient Notifications
- `GET /api/patients/:id/notifications` - Get patient notifications
- `POST /api/patients/:id/notifications` - Create notification
- `PUT /api/patients/:id/notifications/:id/status` - Update notification status

### Component Architecture

#### Reminder Configuration
- Channel selection
- Timing configuration
- Message customization
- Appointment type specific settings
- Response tracking options

#### Notification Center
- Patient notification dashboard
- Notification history
- Read/unread status
- Action buttons
- Preference management

#### Response Management
- Confirmation tracking
- Cancellation workflow
- Rescheduling interface
- No-response follow-up
- Analytics dashboard

## 4. Patient Feedback and Surveys

### Data Model

#### Survey Templates
```
SurveyTemplate {
  id: UUID
  practice_id: UUID
  name: String
  description: Text
  survey_type: Enum (Satisfaction, NPS, Custom)
  questions: JSON
  is_active: Boolean
  created_at: Timestamp
  updated_at: Timestamp
}
```

#### Survey Assignments
```
SurveyAssignment {
  id: UUID
  survey_template_id: UUID
  patient_id: UUID
  appointment_id: UUID (optional)
  provider_id: UUID (optional)
  status: Enum (Pending, Sent, Completed, Expired)
  send_after: Timestamp
  expiration_date: Timestamp
  completion_date: Timestamp (optional)
  created_at: Timestamp
  updated_at: Timestamp
}
```

#### Survey Responses
```
SurveyResponse {
  id: UUID
  survey_assignment_id: UUID
  patient_id: UUID
  responses: JSON
  completion_time: Integer (seconds)
  ip_address: String
  user_agent: String
  created_at: Timestamp
  updated_at: Timestamp
}
```

### API Endpoints

#### Survey Templates
- `GET /api/surveys/templates` - Get all survey templates
- `POST /api/surveys/templates` - Create survey template
- `PUT /api/surveys/templates/:id` - Update survey template
- `GET /api/surveys/templates/:id/questions` - Get survey questions

#### Survey Assignments
- `GET /api/surveys/assignments` - Get all survey assignments
- `POST /api/surveys/assignments` - Create survey assignment
- `GET /api/patients/:id/surveys` - Get patient's surveys
- `GET /api/providers/:id/surveys` - Get provider's surveys

#### Survey Responses
- `POST /api/surveys/:id/responses` - Submit survey response
- `GET /api/surveys/:id/responses` - Get survey responses
- `GET /api/surveys/analytics` - Get survey analytics

### Component Architecture

#### Survey Builder
- Question type selection
- Response scale configuration
- Skip logic and branching
- Scoring rules
- Survey preview

#### Patient Survey Interface
- Mobile-friendly design
- Progress indicator
- Save and resume
- Multimedia question support
- Completion confirmation

#### Feedback Analytics
- Response rate tracking
- Sentiment analysis
- Provider comparison
- Trend analysis
- Improvement suggestions

## 5. Patient Education and Resources

### Data Model

#### Education Resources
```
EducationResource {
  id: UUID
  title: String
  description: Text
  content_type: Enum (Article, Video, PDF, Link)
  content: JSON
  categories: String[]
  tags: String[]
  author: String
  publish_date: Date
  is_published: Boolean
  created_at: Timestamp
  updated_at: Timestamp
}
```

#### Patient Resources
```
PatientResource {
  id: UUID
  patient_id: UUID
  resource_id: UUID
  assigned_by: UUID
  assignment_reason: Text (optional)
  status: Enum (Assigned, Viewed, Completed)
  assigned_date: Timestamp
  viewed_date: Timestamp (optional)
  completed_date: Timestamp (optional)
  created_at: Timestamp
  updated_at: Timestamp
}
```

#### Resource Categories
```
ResourceCategory {
  id: UUID
  name: String
  description: Text
  parent_id: UUID (optional)
  icon: String
  display_order: Integer
  created_at: Timestamp
  updated_at: Timestamp
}
```

### API Endpoints

#### Education Resources
- `GET /api/resources` - Get all resources
- `POST /api/resources` - Create resource
- `PUT /api/resources/:id` - Update resource
- `GET /api/resources/search` - Search resources
- `GET /api/resources/categories/:id` - Get resources by category

#### Patient Resources
- `GET /api/patients/:id/resources` - Get patient's resources
- `POST /api/patients/:id/resources` - Assign resource to patient
- `PUT /api/patients/:id/resources/:id/status` - Update resource status

#### Resource Categories
- `GET /api/resources/categories` - Get all categories
- `POST /api/resources/categories` - Create category
- `PUT /api/resources/categories/:id` - Update category

### Component Architecture

#### Resource Library
- Category browsing
- Search functionality
- Filtering options
- Preview capabilities
- Resource ratings

#### Patient Education Portal
- Personalized resource list
- Progress tracking
- Interactive content
- Mobile optimization
- Offline access

#### Provider Assignment Interface
- Resource recommendation
- Bulk assignment
- Template creation
- Follow-up tracking
- Engagement monitoring

## Implementation Plan

### Phase 1: Digital Patient Intake
1. Implement form builder interface
2. Develop form assignment system
3. Create patient form portal
4. Build form response storage and retrieval

### Phase 2: Automated Communication
1. Implement communication templates
2. Develop campaign management
3. Create multi-channel delivery system
4. Build analytics and tracking

### Phase 3: Appointment Reminders
1. Implement reminder settings
2. Develop automated scheduling
3. Create response handling
4. Build notification center

### Phase 4: Patient Feedback
1. Implement survey builder
2. Develop survey assignment system
3. Create response collection
4. Build analytics dashboard

### Phase 5: Patient Education
1. Implement resource library
2. Develop categorization system
3. Create assignment workflow
4. Build patient education portal

## Technical Considerations

### Performance
- Optimize for mobile devices
- Implement efficient form rendering
- Minimize data transfer for low bandwidth
- Optimize notification delivery

### Security
- Secure PHI in all communications
- Implement consent tracking
- Maintain audit trails
- Ensure secure form submission

### Integration
- Connect with EHR system
- Integrate with appointment system
- Link with patient portal
- Connect with billing system

### Accessibility
- ADA compliance for all interfaces
- Multi-language support
- Screen reader compatibility
- Color contrast considerations

## Metrics and Analytics

### Engagement Metrics
- Form completion rates
- Communication open/click rates
- Appointment confirmation rates
- Resource utilization

### Satisfaction Metrics
- Survey response rates
- Net Promoter Score (NPS)
- Provider ratings
- Feature satisfaction scores

### Operational Metrics
- No-show reduction
- Time savings from digital intake
- Staff communication efficiency
- Patient retention rates

### ROI Analysis
- Cost savings from automation
- Revenue impact of reduced no-shows
- Patient acquisition through improved experience
- Efficiency gains for practice staff
