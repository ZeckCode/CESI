#!/usr/bin/env python3
import re

files = [
    'frontend/FrontEnd/src/components/AdminWebsite/ClassManagement.jsx',
    'frontend/FrontEnd/src/components/AdminWebsite/Dashboard.jsx',
    'frontend/FrontEnd/src/components/AdminWebsite/EnrollmentManagement.jsx',
    'frontend/FrontEnd/src/components/AdminWebsite/AssignTeachers.jsx',
    'frontend/FrontEnd/src/components/AdminWebsite/Header.jsx',
    'frontend/FrontEnd/src/components/AdminWebsite/Reports.jsx',
    'frontend/FrontEnd/src/components/AdminWebsite/PaymentReminders.jsx',
    'frontend/FrontEnd/src/components/AdminWebsite/TransactionHistory.jsx',
    'frontend/FrontEnd/src/components/AdminWebsite/UserManagement.jsx',
]

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<<<<<<<' in content:
        print(f'Resolving {file_path}...')
        
        # Simple string manipulation approach
        while '<<<<<<<' in content:
            start = content.find('<<<<<<<')
            mid = content.find('=======', start)
            end = content.find('>>>>>>>', mid)
            
            if start >= 0 and mid > start and end > mid:
                # Get content after ======= and before >>>>>>>
                before = content[:start]
                after_marker = content[mid + 7:]
                newline_pos = after_marker.find('\n')
                theirs_content = after_marker[newline_pos + 1:]
                end_marker_pos = theirs_content.find('>>>>>>>')
                theirs_clean = theirs_content[:end_marker_pos]
                
                # Get content after >>>>>>>
                final_part = content[end:]
                final_newline = final_part.find('\n')
                after = final_part[final_newline + 1:] if final_newline >= 0 else ''
                
                content = before + theirs_clean + after
            else:
                break
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'✓ Resolved {file_path}')
    else:
        print(f'✓ {file_path} (no conflicts)')

print('\nAll files processed!')
